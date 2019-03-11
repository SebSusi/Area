'use strict';

const _ = require('lodash');
const modelGenerator = require('../models/widget/generator');

function generateWidgetsModel(widgetsConfig) {
    let services = Object.keys(widgetsConfig);
    services.forEach(function (service) {
        if (_.hasIn(widgetsConfig, service + "." + "actions")) {
            widgetsConfig[service].actions.forEach(function (element) {
                if (element.model === undefined)
                    element.model = modelGenerator(element.modelName, element.params)
            });
        }
        if (_.hasIn(widgetsConfig, service + "." + "reactions")) {
            widgetsConfig[service].reactions.forEach(function (element) {
                if (element.model === undefined)
                    element.model = modelGenerator(element.modelName, element.params)
            });
        }
    });
}

let widgets = function () {
    let widgetsConfig = {
        timer: {
            name: "calendar",
            reactions: [],
            actions: [
                {
                    name: "calendar",
                    description: "It's a timer, what do you expected ?",
                    controller: require('../controllers/services/calendar/actions/timer'),
                    modelName: "calendarTimer",
                    params: {
                        duration: {type: String, default: '00:00:05'},
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'duration',
                            label: 'Duration',
                            placeholder: 'hh:mm:ss',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Duration Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
                                    message: 'Please put a duration of format : hh:mm:ss'
                                },
                            ]
                        },
                    ],
                },
                {
                    name: "eachMonth",
                    description: "Triggered every month at specified day and time.",
                    controller: require('../controllers/services/calendar/actions/eachMonth'),
                    modelName: "calendarEachMonth",
                    params: {
                        time: {type: String, default: '00:00:00'},
                        day: {type: Number, default: 1},
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'time',
                            label: 'Time',
                            placeholder: 'hh:mm:ss',
                            validations: [
                                {
                                    type: 'pattern',
                                    pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
                                    message: 'Please put a duration of format : hh:mm:ss'
                                },
                            ]
                        },
                        {
                            type: "number",
                            name: 'day',
                            label: 'Day',
                            validations: [
                                {
                                    type: 'min',
                                    value: 1,
                                    message: 'A Day can\'t be under 1'
                                },
                                {
                                    type: 'max',
                                    value: 31,
                                    message: 'A Day can\'t be over 31'
                                },
                            ]
                        }
                    ]
                },
                {
                    name: "eachDay",
                    description: "Triggered every day at specified time.",
                    controller: require('../controllers/services/calendar/actions/eachDay'),
                    modelName: "calendarEachDay",
                    params: {
                        time: {type: String, default: '00:00:00'},
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'time',
                            label: 'Time',
                            placeholder: 'hh:mm:ss',
                            validations: [
                                {
                                    type: 'pattern',
                                    pattern: '^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$',
                                    message: 'Please put a duration of format : hh:mm:ss'
                                },
                            ]
                        }
                    ]
                },
            ]
        },
        youtube: {
            name: "youtube",
            actions: [
                {
                    name: 'newVideo',
                    description: 'Trigger every time a video is posted by a specified user',
                    accountType: 'google',
                    controller: require('../controllers/services/youtube/actions/newVideo'),
                    modelName: 'youtubeNewVideo',
                    params: {
                        channelUrl: {type: String, default: 'https://www.youtube.com/user/PewDiePie'}
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'channelUrl',
                            label: 'Url of the channel',
                            placeholder: 'https://www.youtube.com/...',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Channel Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^https://www.youtube.com/(user/channel)/*$',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ],
                },
                {
                    name: 'videoInfos',
                    description: 'Trigger every time X (dislikes/likes/comments) has been reached.',
                    accountType: 'google',
                    controller: require('../controllers/services/youtube/actions/videoInfos'),
                    modelName: 'youtubeVideoInfos',
                    params: {
                        type: {type: Number, default: ''},
                        interval: {type: Number, default: ''},
                        videoUrl: {type: String, default: 'https://www.youtube.com/watch?v=6Dh-RL__uN4'}
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'videoUrl',
                            label: 'Url of the video',
                            placeholder: 'https://www.youtube.com/...',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Video Url Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^https://www.youtube.com/watch\?v=*$',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                        {
                            type: "list",
                            name: 'type',
                            label: 'Type of search',
                            placeholder: 'Select a type',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Type is Required'
                                }
                            ],
                            options: [
                                {
                                    name: 'Like',
                                    value: 0
                                },
                                {
                                    name: 'Dislike',
                                    value: 1
                                },
                                {
                                    name: 'Comment',
                                    value: 2
                                },
                                {
                                    name: 'Views',
                                    value: 3
                                }
                            ]
                        },
                        {
                            type: "number",
                            name: 'interval',
                            label: 'Interval',
                            placeholder: 'Select an Interval',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Interval is Required'
                                },
                                {
                                    type: 'min',
                                    value: 1,
                                    message: 'Interval must be over 1'
                                }
                            ],
                        },
                    ],
                },
                {
                    name: 'channelInfos',
                    description: 'Trigger every time X (views/videos/subscibers) has been reached.',
                    accountType: 'google',
                    controller: require('../controllers/services/youtube/actions/channelInfos'),
                    modelName: 'youtubeChannelInfos',
                    params: {
                        type: {type: Number, default: ''},
                        interval: {type: Number, default: ''},
                        channelUrl: {type: String, default: 'https://www.youtube.com/watch?v=6Dh-RL__uN4'}
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'channelUrl',
                            label: 'Url of the channel',
                            placeholder: 'https://www.youtube.com/...',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Channel Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '(?:https|http)\:\/\/(?:[\w]+\.)?youtube\.com\/(?:c\/|channel\/|user\/)?([a-zA-Z0-9\-]{1,})',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                        {
                            type: "list",
                            name: 'type',
                            label: 'Type of search',
                            placeholder: 'Select a type',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Type is Required'
                                }
                            ],
                            options: [
                                {
                                    name: 'Subscribers',
                                    value: 1
                                },
                                {
                                    name: 'Comment',
                                    value: 2
                                },
                                {
                                    name: 'Views',
                                    value: 3
                                }
                            ]
                        },
                        {
                            type: "number",
                            name: 'interval',
                            label: 'Interval',
                            placeholder: 'Select an Interval',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Interval is Required'
                                },
                                {
                                    type: 'min',
                                    value: 1,
                                    message: 'Interval must be over 1'
                                }
                            ],
                        },
                    ],
                }
            ],
            reactions: [
                {
                    name: 'postComment',
                    description: 'Post a comment under a specified video',
                    accountType: 'google',
                    controller: require('../controllers/services/youtube/reactions/postComment'),
                    modelName: 'youtubePostComment',
                    params: {
                        message: {type: String, default: 'First!'},
                        videoUrl: {type: String, default: 'https://www.youtube.com/watch?v=6Dh-RL__uN4'}
                    },
                    fields: [
                        {
                            type: 'text',
                            name: 'message',
                            label: 'Your message',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Video Url Required'
                                },
                            ]
                        },
                        {
                            type: "text",
                            name: 'videoUrl',
                            label: 'Url of the video',
                            placeholder: 'https://www.youtube.com/...',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Video Url Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^(http(s)??\\:\\/\\/)?(www\\.)?((youtube\\.com\\/watch\\?v=)|(youtu.be\\/))([a-zA-Z0-9\\-_])+$',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'likeOrDislikeVideo',
                    description: 'Like or Dislike a specified video',
                    accountType: 'google',
                    controller: require('../controllers/services/youtube/reactions/likeOrDislikeVideo'),
                    modelName: 'youtubeLikeOrDislikeVideo',
                    params: {
                        type: {type: String, default: 'Like'},
                        videoUrl: {type: String, default: 'https://www.youtube.com/watch?v=6Dh-RL__uN4'}
                    },
                    fields: [
                        {
                            type: "list",
                            name: 'type',
                            label: 'Type of search',
                            placeholder: 'Select a type',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Type is Required'
                                }
                            ],
                            options: [
                                {
                                    name: 'Like',
                                    value: 1
                                },
                                {
                                    name: 'Subscribe',
                                    value: 2
                                }
                            ]
                        },
                        {
                            type: "text",
                            name: 'videoUrl',
                            label: 'Url of the video',
                            placeholder: 'https://www.youtube.com/...',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Video Url Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^(http(s)??\\:\\/\\/)?(www\\.)?((youtube\\.com\\/watch\\?v=)|(youtu.be\\/))([a-zA-Z0-9\\-_])+$',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'subscribe',
                    accountType:'google',
                    controller: require('../controllers/services/youtube/reactions/subscribe'),
                    description: 'Subscribe or Unsubcribe to a specified channel',
                    modelName: 'youtubeSubscribe',
                    params: {
                        channelUrl: {type: String, default: 'https://www.youtube.com/channel/PewDiePie'}
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'channelUrl',
                            label: 'Url of the channel',
                            placeholder: 'https://www.youtube.com/...',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Channel Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '(?:https|http)\:\/\/(?:[\w]+\.)?youtube\.com\/(?:c\/|channel\/|user\/)?([a-zA-Z0-9\-]{1,})',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ]
                }
            ]
        },
        twitter: {
            name: "twitter",
            actions: [
                {
                    name: 'newTweet',
                    accountType: 'twitter',
                    controller: require('../controllers/services/twitter/actions/newTweet'),
                    description: 'Trigger when specified user tweet something.',
                    modelName: 'twitterNewTweet',
                    params: {},
                    fields: []
                },
                {
                    name: 'searchMention',
                    accountType: 'twitter',
                    controller: require('../controllers/services/twitter/actions/searchMention'),
                    description: 'Triggers When Any User Creates A New Tweet That Contains A Specific Search Term (Like A Word, Phrase, Username Or Hashtag).',
                    modelName: 'twitterSearchMention',
                    params: {},
                    fields: []
                },
                {
                    name: 'newFollower',
                    accountType: 'twitter',
                    controller: require('../controllers/services/twitter/actions/newFollower'),
                    description: 'Triggers when a user of your choosing gets a new follower.',
                    modelName: 'twitterNewFollower',
                    params: {},
                    fields: []
                },
                {
                    name: 'likeTweet',
                    accountType: 'twitter',
                    controller: require('../controllers/services/twitter/actions/likeTweet'),
                    description: 'Triggers when a specific user likes a tweet.',
                    modelName: 'twitterLikeTweet',
                    params: {},
                    fields: []
                }
            ],
            reactions: [
                {
                    name: 'createTweet',
                    accountType: 'twitter',
                    controller: require('../controllers/services/twitter/reactions/createTweet'),
                    description: 'Creates a tweet.',
                    modelName: 'twitterCreateTweet',
                    params: {},
                    fields: []
                },
                {
                    name: 'followUser',
                    accountType: 'twitter',
                    controller: require('../controllers/services/twitter/reactions/followUser'),
                    description: 'Follow a specified user.',
                    modelName: 'twitterFollowUser',
                    params: {},
                    fields: []
                }
            ]
        },
        gmail: {
            name: "gmail",
            actions: [
                {
                    name: 'newEmail',
                    accountType: 'google',
                    controller: require('../controllers/services/gmail/actions/newEmail'),
                    description: 'Triggers when a new e-mail appears in the specified mailbox.',
                    modelName: 'gmailNewEmail',
                    params: {
                        recipient:{type:String},
                        object:{type:String, default:'Created by Area'},
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'recipient',
                            label: 'Recipient',
                            placeholder: 'email@hotmail.fr',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Mail Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
                                    message: 'Accept only mail format'
                                },
                            ]
                        },
                        {
                            type: "text",
                            name: 'object',
                            label: 'Object',
                            placeholder: 'Created by Area'
                        },
                    ],
                    output: [
                        {
                            name: "recipient",
                            description: "Email recipient"
                        },
                        {
                            name: "object",
                            description: "Email Object"
                        },
                        {
                            name: "body",
                            description: "Email message in body"
                        },
                        {
                            name: "date",
                            description: "Date of reception of the email"
                        }
                    ]
                }
            ],
            reactions: [
                {
                    name: 'createDraft',
                    accountType: 'google',
                    controller: require('../controllers/services/gmail/reactions/createDraft'),
                    description: 'Create a draft.',
                    modelName: 'gmailCreateDraft',
                    params: {
                        recipient: { type: String },
                        object: { type: String, default: 'Created by Area' },
                        body: { type: String }
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'recipient',
                            label: 'Recipient',
                            placeholder: 'email@hotmail.fr',
                            validations: [
                                {
                                    type: 'pattern',
                                    pattern: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
                                    message: 'Accept only mail format'
                                },
                            ]
                        },
                        {
                            type: "text",
                            name: 'object',
                            label: 'Object',
                            placeholder: 'Created by Area'
                        },
                        {
                            type: "text",
                            name: 'body',
                            label: 'Body',
                            placeholder: 'Enter your Messenger'
                        },
                    ],
                    output: [
                        {
                            name: "recipient",
                            description: "Email recipient"
                        },
                        {
                            name: "object",
                            description: "Email Object"
                        },
                        {
                            name: "body",
                            description: "Email message in body"
                        },
                        {
                            name: "date",
                            description: "Date of creation of the email"
                        }
                    ]
                },
                {
                    name: 'sendMail',
                    accountType: 'google',
                    controller: require('../controllers/services/gmail/reactions/sendMail'),
                    description: 'Send a mail to specified user.',
                    modelName: 'gmailSendMail',
                    params: {
                        recipient: { type: String },
                        object: { type: String, default: 'Created by Area' },
                        body: { type: String }
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'recipient',
                            label: 'Recipient',
                            placeholder: 'email@hotmail.fr',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Mail Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$',
                                    message: 'Accept only mail format'
                                },
                            ]
                        },
                        {
                            type: "text",
                            name: 'object',
                            label: 'Object',
                            placeholder: 'Created by Area'
                        },
                        {
                            type: "text",
                            name: 'body',
                            label: 'Body',
                            placeholder: 'Enter your Messenger'
                        },
                    ],
                    output: [
                        {
                            name: "recipient",
                            description: "Email recipient"
                        },
                        {
                            name: "object",
                            description: "Email Object"
                        },
                        {
                            name: "body",
                            description: "Email message in body"
                        },
                        {
                            name: "date",
                            description: "Date of creation of the email"
                        }
                    ]
                }
            ]
        },
        Facebook: {
            name: "facebook",
            actions: [
                {
                    name: 'newPostToYourTimeline',
                    accountType: 'facebook',
                    controller: require('../controllers/services/facebook/actions/newPostToYourTimeline'),
                    description: 'Triggers when anyone (including you) posts to your Page\'s Timeline.',
                    modelName: 'facebookNewPostToYourTimeline',
                    params: {},
                    fields: []
                },
                {
                    name: 'likePage',
                    accountType: 'facebook',
                    controller: require('../controllers/services/facebook/actions/likePage'),
                    description: 'Trigger every time X users have liked a specified page',
                    modelName: 'facebookLikePage',
                    params: {
                        pageurl: {type:String, default:'https://www.facebook.com/TrollsdeGeek/'}
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'pageUrl',
                            label: 'Url of page',
                            placeholder: 'https://www.facebook.com/...',
                            validations: [
                                {
                                    type: 'required',
                                    message: 'Page Url Required'
                                },
                                {
                                    type: 'pattern',
                                    pattern: '^https://www.facebook.com/*$',
                                    message: 'Invalid page Url'
                                },
                            ]
                        }
                    ]
                }
            ],
            reactions: [
                {
                    name: 'postMessage',
                    accountType: 'facebook',
                    controller: require('../controllers/services/facebook/reactions/postMessage'),
                    description: 'Post a Message',
                    modelName: 'facebookPostMessage',
                    params: {
                        message:{type:String, default:'Automatic message by Area'}
                    },
                    fields: [
                        {
                            type: "text",
                            name: 'message',
                            label: 'Message',
                            placeholder: 'Enter your message',
                        }
                    ]
                }
            ]
        },
        'Google+': {
            name: "google+",
        },
        weather: {
            name: "weather",
            actions:
                [
                    {
                        name: 'temperatureChange',
                        description: 'Triggered when the temperature has changed',
                        controller: require('../controllers/services/weather/actions/temperatureChange'),
                        modelName: 'weatherTemperatureChange',
                        params: {
                            city: {type: String, default: 'Nancy'},
                            country: {type: String, default: 'France'},
                        },
                        fields: [
                            {
                                type: "text",
                                name: 'city',
                                label: 'City',
                                placeholder: 'Nancy',
                                validations: [
                                    {
                                        type: 'required',
                                        message: 'Name Required'
                                    },
                                    {
                                        type: 'pattern',
                                        pattern: '^[a-zA-Z]+$',
                                        message: 'Accept only text'
                                    },
                                ]
                            },
                            {
                                type: "text",
                                name: 'country',
                                label: 'Country',
                                placeholder: 'France',
                                validations: [
                                    {
                                        type: 'required',
                                        message: 'Name Required'
                                    },
                                    {
                                        type: 'pattern',
                                        pattern: '^[a-zA-Z]+$',
                                        message: 'Accept only text'
                                    },
                                ]
                            },
                        ],
                        output: [
                            {
                                name: "temperature",
                                description: "Actual temperature"
                            },
                            {
                                name: "skyText",
                                description: "Text that describe the weather"
                            },
                            {
                                name: "date",
                                description: "Actual date"
                            },
                            {
                                name: "observationTime",
                                description: "Actual time"
                            },
                            {
                                name: "observationPoint",
                                description: "From where the weather has been observed"
                            },
                            {
                                name: "feelsLike",
                                description: "Feels like temperature"
                            },
                            {
                                name: "humidity",
                                description: "Humidity in the air"
                            },
                            {
                                name: "windDisplay",
                                description: "Some wind infos"
                            },
                            {
                                name: "day",
                                description: "Day"
                            },
                            {
                                name: "imageUrl",
                                description: "Image Url that represent the weather"
                            }
                        ],
                    },
                    {
                        name: 'weatherChange',
                        description: 'Triggered when the weather has changed',
                        controller: require('../controllers/services/weather/actions/weatherChange'),
                        modelName: 'weatherChange',
                        params: {
                            city: {type: String, default: 'Nancy'},
                            country: {type: String, default: 'France'},
                        },
                        fields: [
                            {
                                type: "text",
                                name: 'city',
                                label: 'City',
                                placeholder: 'Nancy',
                                validations: [
                                    {
                                        type: 'required',
                                        message: 'Name Required'
                                    },
                                    {
                                        type: 'pattern',
                                        pattern: '^[a-zA-Z]+$',
                                        message: 'Accept only text'
                                    },
                                ]
                            },
                            {
                                type: "text",
                                name: 'country',
                                label: 'Country',
                                placeholder: 'France',
                                validations: [
                                    {
                                        type: 'required',
                                        message: 'Name Required'
                                    },
                                    {
                                        type: 'pattern',
                                        pattern: '^[a-zA-Z]+$',
                                        message: 'Accept only text'
                                    },
                                ]
                            },
                        ],
                        output: [
                            {
                                name: "temperature",
                                description: "Actual temperature"
                            },
                            {
                                name: "skyText",
                                description: "Text that describe the weather"
                            },
                            {
                                name: "date",
                                description: "Actual date"
                            },
                            {
                                name: "observationTime",
                                description: "Actual time"
                            },
                            {
                                name: "observationPoint",
                                description: "From where the weather has been observed"
                            },
                            {
                                name: "feelsLike",
                                description: "Feels like temperature"
                            },
                            {
                                name: "humidity",
                                description: "Humidity in the air"
                            },
                            {
                                name: "windDisplay",
                                description: "Some wind infos"
                            },
                            {
                                name: "day",
                                description: "Day"
                            },
                            {
                                name: "imageUrl",
                                description: "Image Url that represent the weather"
                            }
                        ],
                    },
                ],
            reactions: [],
        }
        ,
    };
    generateWidgetsModel(widgetsConfig);
    return widgetsConfig;
};


module.exports = widgets();