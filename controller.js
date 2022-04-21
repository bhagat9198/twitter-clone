const axios = require('axios');
const User = require('./modal');

const TWITTER_v2_API = `https://api.twitter.com/2`;
let config = {
  headers: {
    'Authorization': 'Bearer ' + process.env.BEARER_TOKEN
  }
}

function twitterTweetFields() {
  return `tweet.fields=attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,public_metrics,reply_settings,source`;
}

function twitterExpansions() {
  return `expansions=attachments.media_keys,entities.mentions.username`;
}

function twitterUserFields() {
  return `user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld`;
}

function twitterMediaFields() {
  return `media.fields=duration_ms,height,media_key,non_public_metrics,organic_metrics,preview_image_url,promoted_metrics,public_metrics,type,url,width`;
}

async function getTweetUser({ userId }) {
  try {
    const res = await axios.get(`${TWITTER_v2_API}/users/${userId}?${twitterUserFields}`, config)
  } catch (error) {
    console.log('getQuery :: error :: ', error);
    return {
      status: false
    }
  }
}

exports.getQuery = async (req, res) => {
  const queryParams = req.query.query;
  const nextTokenPamars = req.query.nextToken;
  const userName = req.query.userName;
  // console.log('getQuery ::queryParams :: ', queryParams);
  let url = `${TWITTER_v2_API}/tweets/search/recent?query=${queryParams}&${twitterTweetFields()}&${twitterExpansions()}&${twitterUserFields()}&${twitterMediaFields()}`;
  if (nextTokenPamars) {
    url = `${TWITTER_v2_API}/tweets/search/recent?query=${queryParams}&${twitterTweetFields()}&${twitterExpansions()}&${twitterUserFields()}&${twitterMediaFields()}&next_token=${nextTokenPamars}`;
  } else {
    if (userName) {
      try {
        let userData = await User.find({ userName: userName });
        // console.log('getQuery :: userData :: ', userData);
        if (userData.length > 0) {
          userData[0].queries.push({ query: queryParams, timeStamp: new Date().getTime() });
          userData[0].save();
        } else {
          const user = new User({
            userName,
            queries: [{ query: queryParams, timeStamp: new Date().getTime() }]
          })
          user.save();
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  try {
    const response = await axios.get(url, config)
    // console.log('getQuery :: response :: ', response);
    // console.log('getQuery :: response :: ', response.data);
    return res.status(200).json({
      data: response.data,
      message: 'Success'
    })

  } catch (error) {
    console.log('getQuery :: error :: ', error);
    return res.status(200).json({
      message: `Error : ${error.message}`
    })
  }
}

exports.getUser = async (req, res) => {
  const userId = req.params.userId;
  // console.log('getUser :: userId :: ', userId);
  try {
    const response = await axios.get(`${TWITTER_v2_API}/users/${userId}?${twitterUserFields()}`, config)
    // console.log('getUser :: response :: ', response);
    return res.status(200).json({
      data: response.data,
      message: 'Success'
    })
  } catch (error) {
    console.log('getUser :: error :: ', error);
    return res.status(200).json({
      message: `Error : ${error.message}`
    })
  }
}

