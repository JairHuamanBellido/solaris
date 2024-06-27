export const sqsResponseTemplate: string = `#set($inputRoot = $input.path('$'))
#set($sndMsgResp = $inputRoot.SendMessageResponse)
#set($metadata = $sndMsgResp.ResponseMetadata)
#set($sndMsgRes = $sndMsgResp.SendMessageResult)
{
    "RequestId" : "$metadata.RequestId",
    "MessageId" : "$sndMsgRes.MessageId"
}`;

export const sqsRequestTemplate:string = `#set($dedupId = $context.requestId)
#set($groupId = $input.json('$.roomId'))
Action=SendMessage&MessageBody=$util.urlEncode($input.body)&MessageGroupId=$groupId&MessageDeduplicationId=$dedupId`