export const MyContractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "ads",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "getLoggers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "OperatorName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "OperatorHash",
						"type": "string"
					}
				],
				"internalType": "struct OperationCertification.Attestation[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "opName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "opHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			}
		],
		"name": "setLogger",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const MyContractAddress = "0x53EC13daA648a534b07e070be7Cc91C71BaBe713"