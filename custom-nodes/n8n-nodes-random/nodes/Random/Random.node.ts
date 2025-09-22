import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionType, NodeOperationError } from "n8n-workflow";

export class Random implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Random",
        name: "random",
        icon: "file:random.svg",
        group: ["transform"],
        version: 1,
        description: 'Generates a true random integer using the Random.org API.',
        defaults: {
            name: "Random Number",
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                options: [
                    { name: 'True Random Number Generator', value: 'true-random' },
                ],
                default: 'true-random',
            },
            {
                displayName: "Min",
                name: 'min',
                type: 'number',
                default: 1,
                typeOptions: {
                    minValue: 1,
                },
                required: true,
                description: 'The minimum integer value to generate',
                displayOptions: {
                    show: {
                        operation: ['true-random'],
                    }
                }
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                typeOptions: {
                    minValue: 1,
                },
                description: 'The maximum integer value to generate',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['true-random'],
                    }
                }
            }
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const min = this.getNodeParameter('min', i) as number;
                const max = this.getNodeParameter('max', i) as number;

                if (min >= max) {
                    throw new NodeOperationError(this.getNode(), 'The value of "Max" must be greater than "Min"');
                }

                const qs = {
                    num: 1,
                    min: min,
                    max: max,
                    col: 1,
                    base: 10,
                    format: 'plain',
                    rnd: 'new',
                };

                const options: IHttpRequestOptions = {
                    method: 'GET',
                    qs: qs,
                    url: `https://www.random.org/integers/`,
                };

                const response = await this.helpers.httpRequest(options);
                this.logger.debug('Random API Response', {
                    response,
                    type: typeof response,
                    length: response?.length
                });
                const randomNumber = parseInt(String(response).trim(), 10);
                // const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                if (isNaN(randomNumber)) {
                    throw new NodeOperationError(this.getNode(), 'API response is not a valid number.');
                }
                const newItem: INodeExecutionData = {
                    json: {
                        ...items[i].json,
                        randomNumber: randomNumber,
                    },
                    pairedItem: { item: i },
                };

                returnData.push(newItem);
            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            ...items[i].json,
                            error: error.message,
                        },
                        pairedItem: { item: i },
                    });
                    continue;
                }
                throw error;
            }
        }
        return this.prepareOutputData(returnData);
    }
}
