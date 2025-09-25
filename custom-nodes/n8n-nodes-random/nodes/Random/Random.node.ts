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
                    numberPrecision: 0,
                    minValue: -1_000_000_000,
                    maxValue: 1_000_000_000,
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
                    numberPrecision: 0,
                    minValue: -1_000_000_000,
                    maxValue: 1_000_000_000,
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

    private async generateRandomNumbers(
        context: IExecuteFunctions,
        min: number,
        max: number,
        nums: number = 1
    ): Promise<number[]> {
        const qs = {
            num: nums,
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

        const response = await context.helpers.httpRequest(options);
        context.logger.debug('Random API Response', {
            response,
            type: typeof response,
            length: response?.length
        });

        const responseText = String(response).trim();
        const lines = responseText.split('\n');
        const randomNumbers: number[] = [];

        for (const line of lines) {
            const number = parseInt(line.trim(), 10);
            if (isNaN(number)) {
                throw new NodeOperationError(context.getNode(), `API response contains invalid number: ${line}`);
            }
            randomNumbers.push(number);
        }

        if (randomNumbers.length === 0) {
            throw new NodeOperationError(context.getNode(), 'API response is empty or contains no valid numbers.');
        }

        return randomNumbers;
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i) as string;
                const min = this.getNodeParameter('min', i) as number;
                const max = this.getNodeParameter('max', i) as number;

                if (operation !== 'true-random')
                    throw new NodeOperationError(this.getNode(), `The operation "${operation}" is not supported!`);

                if (min >= max)
                    throw new NodeOperationError(this.getNode(), 'The value of "Max" must be greater than "Min"');

                const randomNumbers = await Random.prototype.generateRandomNumbers.call(this, this, min, max);

                const newItem: INodeExecutionData = {
                    json: {
                        ...items[i].json,
                        randomNumber: randomNumbers[0],
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
