import React, { useState } from 'react'
import useAlert from '../Hooks/useAlert'
import Alert from '../components/Alert'

const ProcessProposal = ({ aeSdk }) => {
  const [votes, setVotes] = useState([
    { proposalId: "", proposalDescription: 'This is a detailed description for Proposal 1. It contains information about the proposal and what it aims to achieve.', trueVote: null, falseVote: null, Status: null },
    { proposalId: "", proposalDescription: 'This is a detailed description for Proposal 2. It contains information about the proposal and what it aims to achieve.', trueVote: null, falseVote: null, Status: null },
    // Add more proposals as needed
  ]);
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

  let proposalId
  let proposalDescription
  let trueVote
  let falseVote
  let Status
  let OriginalId

  let infoStruct = {
    proposalId,
    proposalDescription,
    trueVote,
    falseVote,
    Status,
    OriginalId
  }

  async function getTrueVotes(id) {
    let trueVotes;
    try {
      const contract = await aeSdk.initializeContract({ aci, bytecode, address: "ct_UeiS72NgMqx6uuSi2E4LHPGqZ7oqAWkRgM55sSx5hmFt7vLNk" });
      const options1 = { callStatic: true, gas: null };
      const args = [id];
      const options = Object.fromEntries(
        Object.entries(options1).filter(([, v]) => v != null),
      );

      const result = await contract?.$call("countTrueVotes", args, options);
      // console.log(result);

      trueVotes = result.decodedResult; // Assuming that `decodedResult` contains the true votes

      return trueVotes;
    } catch (e) {
      console.log(e.message);
      // Handle the error or return a default value if needed
      return 0; // Default value for true votes
    }
  }

  async function countFalseVotes(id) {
    let trueVotes;
    try {
      const contract = await aeSdk.initializeContract({ aci, bytecode, address: "ct_UeiS72NgMqx6uuSi2E4LHPGqZ7oqAWkRgM55sSx5hmFt7vLNk" });
      const options1 = { callStatic: true, gas: null };
      const args = [id];
      const options = Object.fromEntries(
        Object.entries(options1).filter(([, v]) => v != null),
      );

      const result = await contract?.$call("countFalseVotes", args, options);
      // console.log(result);

      trueVotes = result.decodedResult; // Assuming that `decodedResult` contains the true votes

      return trueVotes;
    } catch (e) {
      console.log(e.message);
      // Handle the error or return a default value if needed
      return 0; // Default value for true votes
    }
  }

  async function handleProcess(proposal) {
    try {
      const contract = await aeSdk.initializeContract({ aci, bytecode, address: "ct_UeiS72NgMqx6uuSi2E4LHPGqZ7oqAWkRgM55sSx5hmFt7vLNk" });
      const options1 = { callStatic: true, gas: null };
      const args = [proposal.OriginalId];
      const options = Object.fromEntries(
        Object.entries(options1).filter(([, v]) => v != null),
      );
      const result = await contract?.$call("processProposal", args, options);

      if (result.ok) {
        showAlert({ show: true, text: 'Idea Processed Check Status', type: 'success' })
        setTimeout(() => {
          hideAlert({ show: false, text: '', type: '' })
        }, 3000)
        callContractStatic();
      }
    } catch (e) {
      console.error("panchod -->", e.message);
      showAlert({ show: true, text: e.message, type: 'danger' })
      setTimeout(() => {
        hideAlert()
      }, 3000)
    }
  }

  async function callContractStatic() {

    try {
      const contract = await aeSdk.initializeContract({ aci, bytecode, address: "ct_UeiS72NgMqx6uuSi2E4LHPGqZ7oqAWkRgM55sSx5hmFt7vLNk" })
      const args = [];
      const options1 = { callStatic: true, gas: null };
      const options = Object.fromEntries(
        Object.entries(options1).filter(([, v]) => v != null),
      );

      let resultData;

      const result = await contract
        ?.$call("getAllProposals", args, options)

      console.log(result.decodedResult);

      const decodedResultArray = Array.from(result.decodedResult, ([key, value]) => ({ key, value }));

      const dataArray = await Promise.all(decodedResultArray.map(async (data) => {
        // console.log(data.value.approvalStatus)
        let newInfo = { ...infoStruct };
        newInfo.proposalId = parseInt(data.value.id);
        newInfo.proposalDescription = data.value.description;
        let trueVotes = await getTrueVotes(newInfo.proposalId);
        let falseVotes = await countFalseVotes(newInfo.proposalId);
        newInfo.trueVote = parseInt(trueVotes)
        newInfo.falseVote = parseInt(falseVotes);
        newInfo.Status = data.value.approvalStatus;
        newInfo.OriginalId = data.value.id;
        return newInfo;
      }));

      setVotes(dataArray);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className="p-4 text-center">
      {alert.show && <Alert {...alert} />}
      <div className='flex justify-between items-center  '>
        <h2 className="text-3xl font-bold mb-4 text-center">Check Votes</h2>
        <button
          onClick={() => {
            callContractStatic();
          }}
          className='text-right bg-blue-500 px-4 py-2 rounded-md text-white font-semibold  hover:bg-blue-400'> Reload</button>
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Proposal ID</th>
            <th className="px-4 py-2">Proposal Description</th>
            <th className="px-4 py-2">trueVotes</th>
            <th className="px-4 py-2">falseVotes</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {votes.map((proposal, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{proposal.proposalId}</td>
              <td className="border px-4 py-2">{proposal.proposalDescription}</td>
              <td className="border px-4 py-2">{proposal.trueVote}</td>
              <td className="border px-4 py-2">{proposal.falseVote}</td>
              <td className="border px-4 py-2">{proposal.Status}</td>
              {/* <td className="border px-4 py-2">{proposal.Status}</td> */}

              <td className="border px-4 py-2">
                <button
                  className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-400`}
                  onClick={() => handleProcess(proposal)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProcessProposal
