import React, { useState } from 'react';
import image from '../assets/main.jpg'; // Ensure you have an appealing image related to the idea submission concept
import useAlert from '../Hooks/useAlert'
import Alert from '../components/Alert'


const SubmitProposal = ({ aeSdk }) => {
  const [idea, setIdea] = useState('');
  const [submitted, SetSubmitted] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  let aci = [
    {
      "namespace": {
        "name": "ListInternal",
        "typedefs": []
      }
    },
    {
      "namespace": {
        "name": "List",
        "typedefs": []
      }
    },
    {
      "namespace": {
        "name": "String",
        "typedefs": []
      }
    },
    {
      "contract": {
        "functions": [
          {
            "arguments": [
              {
                "name": "registrationFee",
                "type": "int"
              }
            ],
            "name": "init",
            "payable": false,
            "returns": "GovernancePlatform.state",
            "stateful": false
          },
          {
            "arguments": [
              {
                "name": "description",
                "type": "string"
              }
            ],
            "name": "submitProposal",
            "payable": false,
            "returns": "int",
            "stateful": true
          },
          {
            "arguments": [],
            "name": "getAllProposals",
            "payable": false,
            "returns": {
              "map": [
                "int",
                "GovernancePlatform.proposal"
              ]
            },
            "stateful": false
          },
          {
            "arguments": [
              {
                "name": "proposalId",
                "type": "int"
              }
            ],
            "name": "getProposalById",
            "payable": false,
            "returns": {
              "option": [
                "GovernancePlatform.proposal"
              ]
            },
            "stateful": false
          },
          {
            "arguments": [
              {
                "name": "proposalId",
                "type": "int"
              },
              {
                "name": "voting",
                "type": "string"
              }
            ],
            "name": "vote",
            "payable": true,
            "returns": "int",
            "stateful": true
          },
          {
            "arguments": [
              {
                "name": "proposalId",
                "type": "int"
              }
            ],
            "name": "votecount",
            "payable": false,
            "returns": {
              "map": [
                "address",
                "string"
              ]
            },
            "stateful": true
          },
          {
            "arguments": [
              {
                "name": "proposalId",
                "type": "int"
              }
            ],
            "name": "countTrueVotes",
            "payable": false,
            "returns": "int",
            "stateful": false
          },
          {
            "arguments": [
              {
                "name": "proposalId",
                "type": "int"
              }
            ],
            "name": "countFalseVotes",
            "payable": false,
            "returns": "int",
            "stateful": false
          },
          {
            "arguments": [
              {
                "name": "proposalId",
                "type": "int"
              }
            ],
            "name": "processProposal",
            "payable": false,
            "returns": "string",
            "stateful": true
          }
        ],
        "kind": "contract_main",
        "name": "GovernancePlatform",
        "payable": false,
        "state": {
          "record": [
            {
              "name": "proposals",
              "type": {
                "map": [
                  "int",
                  "GovernancePlatform.proposal"
                ]
              }
            },
            {
              "name": "nextProposalId",
              "type": "int"
            },
            {
              "name": "registrationFee",
              "type": "int"
            }
          ]
        },
        "typedefs": [
          {
            "name": "proposal",
            "typedef": {
              "record": [
                {
                  "name": "id",
                  "type": "int"
                },
                {
                  "name": "description",
                  "type": "string"
                },
                {
                  "name": "submitter",
                  "type": "address"
                },
                {
                  "name": "votes",
                  "type": {
                    "map": [
                      "address",
                      "string"
                    ]
                  }
                },
                {
                  "name": "approvalStatus",
                  "type": "string"
                }
              ]
            },
            "vars": []
          }
        ]
      }
    }
  ];
  let bytecode =
    "cb_+QRkRgOg9FHQj8voB5JwM3R9MAZ6Hew9Vy7hjMe5w5AVjxb20LvAuQQ2uQNp/gg74mAENwIHdwcaCgCCVQArGAAAKAwGLwAmAAcMBPsDNUFscmVhZHkgdm90ZWQLACIghgcMCPsDaUluc3VmZmljaWVudCBmdW5kcyB0byB2b3RlGgoMhlUAZQgMGgoOgisYDgAoDhAGVQAtShIQAisaGoIAKawGGhItGoKCAAEBAP4oWbZmADcBBwcaCgCCLxiCAAcMCAwDr4IAAQA/DwIECD4EBAYBAwBGOgYEAAwDEXRydWUoLAYGMgAEAxHX6t1CKxgAAET8IwACAgIPAgQIPgQEBv5E1kQfADcBBzcAGg6CLwAaDoQCGgaGAAEDP/5nMtjJADcBdwcaCgCEDAKEDAEAVQAMAy8ADAMdUGVuZGluZycMCg8CBhEChC2qgoIABgECAP6wmDFPADcBB2dHAHcaCgCCLxiCAAcMCAwDr4IAAQA/DwIECD4EBAYBAy8ARjoGBAAoLAYGACsYAABE/CMAAgICDwIECD4EBAb+1+rdQgI3Aic3AkcAd3cHMwQABwwKNQYAADYGAgAoLgYCACAYBgIHDAYaCQACBgMADAECDAICAgMR1+rdQhAAAQMA/uKRFlQANwEHBxoKAIIvGIIABwwIDAOvggABAD8PAgQIPgQEBgEDAEY6BgQADAMVZmFsc2UoLAYGMgAEAxHX6t1CKxgAAET8IwACAgIPAgQIPgQEBv7sHhpWADcBB3caCgCCKxoCAAAMAQACAxEoWbZmDwIEDAEAAgMR4pEWVA8CBhQqCAQGIjgIFAcMCPsDxU1pbmltdW0gMTAgdm90ZXMgcmVxdWlyZWQgdG8gcHJvY2VzcyB0aGUgcHJvcG9zYWwUOAYEHwgEBwwM+wPFSW5zdWZmaWNpZW50ICd0cnVlJyB2b3RlcyB0byBhcHByb3ZlIHRoZSBwcm9wb3NhbB8oBAYHDBArGhqCACnsCBohUmVqZWN0ZWQtGoKCAAEDRVByb3Bvc2FsIFJlamVjdGVkUwAoLAQCZQArGhyCACnsCBwhQXBwcm92ZWQtGoKCAAEDRVByb3Bvc2FsIGFjY2VwdGVk/vM3ru8ANwBnBzcFB3dHAGdHAHd3AQKC/vNoUqUANwEHhwI3ADcBNwUHd0cAZ0cAd3caCgCCLxiCAAcMBAEDr4IAAQA/KxgAAET8IwACAgIAuMUvChEIO+JgEXZvdGURKFm2Zjljb3VudFRydWVWb3RlcxFE1kQfEWluaXQRZzLYyTlzdWJtaXRQcm9wb3NhbBGwmDFPJXZvdGVjb3VudBHX6t1CeS5Hb3Zlcm5hbmNlUGxhdGZvcm0uY291bnRWb3RlcxHikRZUPWNvdW50RmFsc2VWb3RlcxHsHhpWPXByb2Nlc3NQcm9wb3NhbBHzN67vPWdldEFsbFByb3Bvc2FscxHzaFKlPWdldFByb3Bvc2FsQnlJZIIvAIU3LjQuMADpdOv9"

  const handleIdeaChange = (e) => {
    setIdea(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the submission logic, e.g., sending the idea to the server
    try {

      const contract = await aeSdk.initializeContract({ aci, bytecode, address: "ct_UeiS72NgMqx6uuSi2E4LHPGqZ7oqAWkRgM55sSx5hmFt7vLNk" })
      console.log("contract", contract);

      const options1 = {
        amount: 0,
        callData: "",
        fee: null,
        gas: null,
        gasPrice: 1000000000,
      };
      const args = [idea];
      const options = Object.fromEntries(
        Object.entries(options1).filter(([, v]) => v != null),
      );

      contract
        ?.$call("submitProposal", args, options)
        .then((result) => {
          console.log(result);
          showAlert({ show: true, text: 'Idea has been Submitted successfullt!', type: 'success' })
          setIdea('');
          SetSubmitted(true);

          setTimeout(() => {
            hideAlert({ show: false, text: '', type: '' })
          }, 3000)
          setTimeout(() => {
            SetSubmitted(false);
          }, 5000);

        });

    } catch (error) {
      console.error(error.message);
      showAlert({ show: true, text: error.message, type: 'danger'})
      setTimeout(() => {
        hideAlert()
      }, 3000)
    }

  };

  return (
    <>
      {alert.show && <Alert {...alert} />}
      < div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600 text-white" >



        <div className="max-w-xl p-8 mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold mb-6 text-center text-black">Submit Your Idea </h2>
          <img src={image} alt="Submit Proposal" className="mb-6 rounded-md shadow-lg" />

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="idea" className="block text-gray-700 font-medium mb-2">
                Explain Your Idea Here:
              </label>
              <textarea
                id="idea"
                name="idea"
                rows="4"
                className="text-black w-full border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500"
                value={idea}
                onChange={handleIdeaChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"

            >
              {submitted ? 'submitted' : 'submit'}
            </button>
          </form>
        </div>
      </div >
    </>
  );
};

export default SubmitProposal;
