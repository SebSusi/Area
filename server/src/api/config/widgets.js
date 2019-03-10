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
                    name: "timer",
                    description: "It's a timer, what do you expected ?",
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                                    pattern: '^https://www.youtube.com/(user/channel)/*$',
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
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                                    pattern: '^https://www.youtube.com/watch*$',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'likeOrDislikeVideo',
                    description: 'Like or Dislike a specified video',
                    controller: require('../controllers/services/weather/actions/temperatureChange'),
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
                                    pattern: '^https://www.youtube.com/watch\?v=*$',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'subscribe',
                    controller: require('../controllers/services/youtube/reactions/subscribe'),
                    description: 'Subscribe or Unsubcribe to a specified channel',
                    modelName: 'youtubeSubscribe',
                    params: {},
                    fields: []
                }
            ]
        },
        twitter: {
            name: "twitter",
            actions: [
                {
                    name: 'newTweet',
                    controller: require('../controllers/services/twitter/actions/newTweet'),
                    description: 'Trigger when specified user tweet something.',
                    modelName: 'twitterNewTweet',
                    params: {},
                    fields: []
                },
                {
                    name: 'searchMention',
                    controller: require('../controllers/services/twitter/actions/searchMention'),
                    description: 'Triggers When Any User Creates A New Tweet That Contains A Specific Search Term (Like A Word, Phrase, Username Or Hashtag).',
                    modelName: 'twitterSearchMention',
                    params: {},
                    fields: []
                },
                {
                    name: 'newFollower',
                    controller: require('../controllers/services/twitter/actions/newFollower'),
                    description: 'Triggers when a user of your choosing gets a new follower.',
                    modelName: 'twitterNewFollower',
                    params: {},
                    fields: []
                },
                {
                    name: 'likeTweet',
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
                    controller: require('../controllers/services/twitter/reactions/createTweet'),
                    description: 'Creates a tweet.',
                    modelName: 'twitterCreateTweet',
                    params: {},
                    fields: []
                },
                {
                    name: 'followUser',
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
                    controller: require('../controllers/services/gmail/actions/newEmail'),
                    description: 'Triggers when a new e-mail appears in the specified mailbox.',
                    modelName: 'gmailNewEmail',
                    params: {},
                    fields: []
                }
            ],
            reactions: [
                {
                    name: 'createDraft',
                    controller: require('../controllers/services/gmail/reactions/createDraft'),
                    description: 'Create a draft.',
                    modelName: 'gmailCreateDraft',
                    params: {},
                    fields: []
                },
                {
                    name: 'sendMail',
                    controller: require('../controllers/services/gmail/reactions/sendMail'),
                    description: 'Send a mail to specified user.',
                    modelName: 'gmailSendMail',
                    params: {},
                    fields: []
                }
            ]
        },
        Facebook: {
            name: "facebook",
            actions: [
                {
                    name: 'newPostToYourTimeline',
                    controller: require('../controllers/services/facebook/actions/newPostToYourTimeline'),
                    description: 'Triggers when anyone (including you) posts to your Page\'s Timeline.',
                    modelName: 'facebookNewPostToYourTimeline',
                    params: {},
                    fields: []
                },
                {
                    name: 'likePage',
                    controller: require('../controllers/services/facebook/actions/likePage'),
                    description: 'Trigger every time X users have liked a specified page',
                    modelName: 'facebookLikePage',
                    params: {},
                    fields: []
                }
            ],
            reactions: [
                {
                    name: 'postMessage',
                    controller: require('../controllers/services/facebook/reactions/postMessage'),
                    description: 'Post a Message',
                    modelName: 'facebookPostMessage',
                    params: {},
                    fields: []
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
                        description: 'Triggered when the weather has changed',
                        controller: require('../controllers/services/weather/actions/temperatureChange'),
                        modelName: 'weatherTemperatureChange',
                        params: {
                            city: {type: String, default: 'Nancy'},
                            country: {type: String, default: 'France'},
                        },
                        fields: [
                            {
                                type: "checkbox",
                                name: 'city',
                                label: 'City',
                                placeholder: 'Nancy',
                                options: [
                                    {
                                        value: 1,
                                        label: 'Felicien'
                                    },
                                    {
                                        value: 2,
                                        label: 'Felicienne'
                                    }
                                ],
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
                                type: "checkbox",
                                name: 'country',
                                label: 'Country',
                                placeholder: 'France',
                                options: [
                                    {
                                        value: 1,
                                        label: 'Felicien'
                                    },
                                    {
                                        value: 2,
                                        label: 'Felicienne'
                                    }
                                ],
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
                                description: "Temperature actuelle"
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