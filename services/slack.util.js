const { WebClient } = require('@slack/web-api');
const BE_CHANNEL = 'C015A8NQ554';
const FE_CHANNEL = 'C014K4FT38V';

const options = {};
const web = new WebClient(process.env.SLACK_TOKEN, options);

const updateSlackMessage = async (messageId, message, isServer) => {
    if (!messageId) {
        console.error('# error trying to update message: messageId is missing');
        return;
    }
    const channel = isServer ? BE_CHANNEL : FE_CHANNEL;
    try {
        await web.chat.update({
            channel,
            ts: messageId,
            text: message
        });
    } catch (e) {
        console.error('# error trying to update message:', e.message,' message',message);
        return e;
    }
}
const replayToSlackMessage = async (messageId, message, isServer) => {
    if (!messageId) {
        console.error('# error trying to replay message: messageId is missing');
        return;
    }
    const channel = isServer ? BE_CHANNEL : FE_CHANNEL;
    try {
        await web.chat.postMessage({
            channel,
            thread_ts: messageId,
            text: message
        });

    } catch (e) {
        console.error('# error trying to reply to a message:', e.message, 'message',message);
        return e;
    }
}
const reactToSlackMessage = async (messageId, reaction, isServer) => {
    if (!messageId) {
        console.error('# error trying to react message: messageId is missing');
        return;
    }
    const channel = isServer ? BE_CHANNEL : FE_CHANNEL;
    try {
        await web.reactions.add({
            channel,
            ts: messageId,
            timestamp: messageId,
            name: reaction
        });
    } catch (e) {
        console.error('# error trying to react to a message:', e.message, 'messageId:',messageId,'reaction', reaction);
        return e;
    }
}
const removeReactToSlackMessage = async (messageId, reaction, isServer) => {
    if (!messageId) {
        console.error('# error trying to remove reaction message: messageId is missing');
        return;
    }
    const channel = isServer ? BE_CHANNEL : FE_CHANNEL;
    try {
        await web.reactions.remove({
            channel,
            ts: messageId,
            timestamp: messageId,
            name: reaction
        });
    } catch (e) {
        console.error('# error trying to remove message reaction:', e.message, 'messageId:',messageId,'reaction', reaction);
        console.error('# error: ', e.message);
        return e;
    }
}
const deleteSlackMessage = async (messageId, isServer) => {
    if (!messageId) {
        console.error('# error trying to delete message: messageId is missing');
        return;
    }
    const channel = isServer ? BE_CHANNEL : FE_CHANNEL;

    try {
        await web.chat.delete({
            channel,
            ts: messageId
        });
    } catch (e) {
        console.error('# error trying to delete message:', e.message, ' messageId',messageId)
        return e;
    }
};

const sendSlackMessageNow = async (message, channel) => {
    const resp = await web.chat.postMessage({
        text: message,
        channel,
    });
    return resp.ts;
}
const sendSlackMessage = async (message, isServerChannel) => {
    const channel = isServerChannel ? BE_CHANNEL : FE_CHANNEL;
    try {
        const messageId = await sendSlackMessageNow(message, channel);
        return messageId;
    } catch (e) {
        console.error('# error trying to send message:', e.message);
        return e;
    }
};

const sendSlackNotification = async (isServerChannel, message) => {
    const channel = isServerChannel ? BE_CHANNEL : FE_CHANNEL;

    try {
        const messageId = await sendSlackMessageNow(message, channel);

        return messageId;

    } catch (e) {
        console.error('# error trying to send message:', e.message);
        return e;
    }
};


module.exports = {
    sendSlackMessage,
    deleteSlackMessage,
    replayToSlackMessage,
    reactToSlackMessage,
    updateSlackMessage,
    removeReactToSlackMessage,
    sendSlackNotification
}
