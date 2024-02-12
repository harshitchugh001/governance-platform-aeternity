import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/main.jpg';
import image2 from '../assets/Image.jpg';


const Home = ({address,balance,aeSdk}) => {
  
  const [login,setLogin] = useState(false);
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

  return (
    <>
      <div
        className='position-fixed top-0 left-0 p-4 bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-600'
        style={{ zIndex: 1000 }}
      >
        <label className='text-black-500 font-semibold '>Wallet Address: </label>
        <label>{address}</label>
        <br />
        <label className='text-black-500 font-semibold '>Balance : </label>
        <label>{balance}</label>

      </div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 text-white">
        <div className="max-w-6xl p-8 mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-6xl lg:text-7xl font-extrabold mb-6" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
              Revolutionize Governance
            </h1>
            <p className="text-xl mb-8" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>
              Empowering people through transparent and efficient governance, our platform leverages blockchain technology to ensure every voice is heard and every vote counts. Dive into a new era of democratic engagement and accountability.
            </p>
            <Link to="/Submit" className="inline-block bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
              Submit Your Proposal
            </Link>
          </div>

          <div className="lg:w-1/2 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <img
                src={image}
                alt="Governance Platform Image"
                className="max-w-md h-auto rounded-lg shadow-2xl mb-4"
              />
              <img
                src={image2}
                alt="Governance Platform Image"
                className="max-w-md h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
