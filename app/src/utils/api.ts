import axios from 'axios';
import { Alert } from 'react-native';

interface Response {
	[propName: string]: any
}

export default class Api {

	static Call = (FunctionName: string, Parameters: object) => {

		let UserId = 1;
		let ApiCallParameters:Response = Parameters;
		ApiCallParameters['Function'] = FunctionName;
		ApiCallParameters['UserId'] = UserId;

		return new Promise ((resolve:any, reject:any) => {
			axios.get(
				'https://api.lacathon.com/api_endpoint.php', 
				{params:ApiCallParameters}
			).then((response:any) => {
				let ReturnArray = response.data;
				if(ReturnArray['Error']) {
					return reject("There was an error");
				} else {
					return resolve(ReturnArray['Content']);
				}
				//return resolve(ReturnArray['Content']);
			}).catch((err:any) => {
				// TODO: Error handling
				console.log(err);
				return reject(err);
			})
   		});
	}
}


