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

/*
'Timer':
    action : toute les x (...)
    action : changement de mois (+ horraire)
    action : changement de jour (+ horraire)
'Youtube':
    action : NewVideo : Trigger every time a video is posted by a specified user
    action : VideoInfos : Trigger every time X (dislikes/likes/comments) has been reached
    action : ChannelInfos : Trigger every time X (vues/videos/subscibers) has been reached
    reaction : PostComment : Post a comment under a specified video
    reaction : LikeOrDislikeVideo : like or Dislike a specified video
    reaction : Subscribe : Subscribe or Unsubcribe to a specified channel
'Twitter':
    action : NewTweet : Trigger when specified user tweet something.
    action : SearchMention : Triggers When Any User Creates A New Tweet That Contains A Specific Search Term (Like A Word, Phrase, Username Or Hashtag).
    action : NewFollower : Triggers when a user of your choosing gets a new follower.
    action : LikeTweet : Triggers when a specific user likes a tweet.
    reaction : CreateTweet : Creates a tweet.
    reaction : FollowUser : Follow a specified user.
'Gmail':
    action : NewEmail : Triggers when a new e-mail appears in the specified mailbox.
    reaction : CreateDraft : Create a draft.
    reaction : SendMail : Send a mail to specified user.
'Facebook':
    action: NewPostToYourTimeline: Triggers when anyone (including you) posts to your Page's Timeline.
    action: LikePage : Trigger every time X users have liked a specified page
    reaction: PostMessage : Post a Message
'Google+':
''
*/

let widgets = function () {
    let widgetsConfig = {
        timer: {
            name: "calendar",
            actions: [
                {
                    name: "timer",
                    description: "It's a timer, what do you expected ?",
                    controller: require(''),
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
                                    pattern: '\'^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$\'',
                                    message: 'Please put a duration of format : hh:mm:ss'
                                },
                            ]
                        },
                    ],
                },
                {
                    name: "EachMonth",
                    description: "Triggered every month at specified day and time.",
                    controller: required(''),
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
                                    pattern: '\'^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$\'',
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
                    name: "EachDay",
                    description: "Triggered every day at specified time.",
                    controller: required(''),
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
                                    pattern: '\'^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$\'',
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
                    controller: require(''),
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
                                    pattern: '\'^https://www.youtube.com/(user/channel)/*$\'',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ],
                },
                {
                    name: 'videoInfos',
                    description: 'Trigger every time X (dislikes/likes/comments) has been reached.',
                    controller: require(''),
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
                                    pattern: '\'^https://www.youtube.com/watch\?v=*$\'',
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
                    controller: require(''),
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
                                    pattern: '\'^https://www.youtube.com/(user/channel)/*$\'',
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
                    controller: require(''),
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
                                    pattern: '\'^https://www.youtube.com/watch\?v=*$\'',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'likeOrDislikeVideo',
                    description: 'Like or Dislike a specified video',
                    controller: require(''),
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
                                    pattern: '\'^https://www.youtube.com/watch\?v=*$\'',
                                    message: 'Invalid youtube Url'
                                },
                            ]
                        },
                    ]
                }
            ]
        },
        weather: {
            name: "weather",
            actions: [
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
                                    pattern: '\'^[a-zA-Z]+$\'',
                                    message: 'Accept only text'
                                },
                            ]
                        },
                    ],
                    output: {
                        temperature: {type: "Number", value: 10},
                    },
                },
            ],
            reactions: [],
        },
    };
    generateWidgetsModel(widgetsConfig);
    return widgetsConfig;
};


module.exports = widgets();