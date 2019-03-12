
# Dashboard

## About
| Url                                                               | Version | Contact                                                                       | Terms of Service                                                        | License                                                                 |
| ----------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [127.0.0.1:8080/](http://127.0.0.1:8080/ "API url") | 1.0.0   | [julian.ladjani@epitech.eu](mailto:julian.ladjani@epitech.eu "Contact Email") | [http://swagger.io/terms/](http://swagger.io/terms/ "Terms of Service") | [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html "License") |


## Installation

    docker-compose build

## Running

    COMPOSE_HTTP_TIMEOUT=300 docker-compose up
  
## Services
### Calendar 
#### Actions
timer: It's a timer, what do you expect ?
eachMonth: Triggered every month at specified day and time.
eachDay: Triggered every day at specified time.

### Youtube 
#### Actions
newVideo: Trigger every time a video is posted by a specified user
videoInfos: Trigger every time X (dislikes/likes/comments) has been reached.
channelInfos: Trigger every time X (views/videos/subscibers) has been reached.
#### Reactions
postComment: Post a comment under a specified video
likeOrDislikeVideo: Like or Dislike a specified video
subscribe: Subscribe or Unsubcribe to a specified channel

### Twitter
#### Actions
newTweet: Trigger when specified user tweet something.
searchMention: Triggers When Any User Creates A New Tweet That Contains A Specific Search Term (Like A Word, Phrase, Username Or Hashtag).
newFollower: Triggers when a user of your choosing gets a new follower.
likeTweet: Triggers when a specific user likes a tweet.
#### Reactions
createTweet: Creates a tweet.
followUser: Follow a specified user.

### Gmail
#### Actions
newEmail: Triggers when a new e-mail appears in the specified mailbox.
#### Reactions
createDraft: Create a draft.
sendMail: Send a mail to specified user.

### Facebook
#### Actions
newPostToYourTimeline: Triggers when anyone (including you) posts to your Page\'s Timeline.
likePage: Trigger every time X users have liked a specified page
#### Reactions
postMessage: Post a Message

### Google+
Nothing what did you expect ^^

### Weather
#### Actions
temperatureChange: Triggered when the temperature has changed
weatherChange: Triggered when the weather has changed

### Terminal
#### Reactions
print: Print to terminal.

## Api documentation

[OpenApi documentation](https://editor.swagger.io/?_ga=2.185801193.1959765599.1552354493-1770269318.1552354493)

