Install Serverless

Configure Serverless

serverless config credentials --provider aws --key xxx --secret yyy

Deploy TO AWS
serverless deploy --stage dev --region us-east-1


1. Create Record - Post

  https://tm3omkqamc.execute-api.us-east-1.amazonaws.com/dev/items

  {
	"title":"title",
	"description":"Description"
}



2.Get The Record - Get

 https://tm3omkqamc.execute-api.us-east-1.amazonaws.com/dev/items/{id}
 https://tm3omkqamc.execute-api.us-east-1.amazonaws.com/dev/items/259a48fa-1283-499e-9004-aa290555af39