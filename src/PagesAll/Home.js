import React, { useState } from 'react';
import OAuth from 'oauth-1.0a';
import Navbar from './Navbar'
import UserList from './UserList'
import CryptoJS from 'crypto-js';

const Home = () => {
  // Set your OAuth credentials
  const oauth = OAuth({
    consumer: {
      key: '8885859a-b6c7-49b8-8b6f-ba7a6feea368!chandu.singh@exavalu.dev.com',
      secret: '23f179c2-1071-4317-8a24-298abbf0c723',
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    },
  });

  const [responseData, setResponseData] = useState(null);

  const postData = async () => {
    const requestBody = `<?xml version="1.0"?>
    <documentRequest>
      <projectId>690246194</projectId>
      <properties>
        <name>merge.pdf</name>
        <value>true</value>
      </properties>
      <batchConfigResId>690792852</batchConfigResId>
      <transactionData>PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPFJvb3Q+CiAgICA8Q3VzdG9tZXJzPgogICAgICAgIDxUZW1wbGF0ZUlkPjY5MDc5NTcwNjwvVGVtcGxhdGVJZD4KICAgICAgICA8Q3VzdG9tZXIgQ3VzdG9tZXJJRD0iR1JFQUwiPgogICAgICAgICAgICA8Q29tcGFueU5hbWU+R3JlYXQgTGFrZXMgRm9vZCBNYXJrZXQ8L0NvbXBhbnlOYW1lPgogICAgICAgICAgICA8Q29udGFjdE5hbWU+SG93YXJkIFNueWRlcjwvQ29udGFjdE5hbWU+CiAgICAgICAgICAgIDxDb250YWN0VGl0bGU+TWFya2V0aW5nIE1hbmFnZXI8L0NvbnRhY3RUaXRsZT4KICAgICAgICAgICAgPFBob25lPig1MDMpIDU1NS03NTU1PC9QaG9uZT4KICAgICAgICAgICAgPEZ1bGxBZGRyZXNzPgogICAgICAgICAgICAgICAgPEFkZHJlc3M+MjczMiBCYWtlciBCbHZkLjwvQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxDaXR5PkV1Z2VuZTwvQ2l0eT4KICAgICAgICAgICAgICAgIDxSZWdpb24+T1I8L1JlZ2lvbj4KICAgICAgICAgICAgICAgIDxQb3N0YWxDb2RlPjk3NDAzPC9Qb3N0YWxDb2RlPgogICAgICAgICAgICAgICAgPENvdW50cnk+VVNBPC9Db3VudHJ5PgogICAgICAgICAgICA8L0Z1bGxBZGRyZXNzPgogICAgICAgIDwvQ3VzdG9tZXI+CiAgICAgICAgPEN1c3RvbWVyIEN1c3RvbWVySUQ9IkhVTkdDIj4KICAgICAgICAgICAgPENvbXBhbnlOYW1lPkh1bmdyeSBDb3lvdGUgSW1wb3J0IFN0b3JlPC9Db21wYW55TmFtZT4KICAgICAgICAgICAgPENvbnRhY3ROYW1lPllvc2hpIExhdGltZXI8L0NvbnRhY3ROYW1lPgogICAgICAgICAgICA8Q29udGFjdFRpdGxlPlNhbGVzIFJlcHJlc2VudGF0aXZlPC9Db250YWN0VGl0bGU+CiAgICAgICAgICAgIDxQaG9uZT4oNTAzKSA1NTUtNjg3NDwvUGhvbmU+CiAgICAgICAgICAgIDxGYXg+KDUwMykgNTU1LTIzNzY8L0ZheD4KICAgICAgICAgICAgPEZ1bGxBZGRyZXNzPgogICAgICAgICAgICAgICAgPEFkZHJlc3M+Q2l0eSBDZW50ZXIgUGxhemEgNTE2IE1haW4gU3QuPC9BZGRyZXNzPgogICAgICAgICAgICAgICAgPENpdHk+RWxnaW48L0NpdHk+CiAgICAgICAgICAgICAgICA8UmVnaW9uPk9SPC9SZWdpb24+CiAgICAgICAgICAgICAgICA8UG9zdGFsQ29kZT45NzgyNzwvUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxDb3VudHJ5PlVTQTwvQ291bnRyeT4KICAgICAgICAgICAgPC9GdWxsQWRkcmVzcz4KICAgICAgICA8L0N1c3RvbWVyPgogICAgICAgIDxDdXN0b21lciBDdXN0b21lcklEPSJMQVpZSyI+CiAgICAgICAgICAgIDxDb21wYW55TmFtZT5MYXp5IEsgS291bnRyeSBTdG9yZTwvQ29tcGFueU5hbWU+CiAgICAgICAgICAgIDxDb250YWN0TmFtZT5Kb2huIFN0ZWVsPC9Db250YWN0TmFtZT4KICAgICAgICAgICAgPENvbnRhY3RUaXRsZT5NYXJrZXRpbmcgTWFuYWdlcjwvQ29udGFjdFRpdGxlPgogICAgICAgICAgICA8UGhvbmU+KDUwOSkgNTU1LTc5Njk8L1Bob25lPgogICAgICAgICAgICA8RmF4Pig1MDkpIDU1NS02MjIxPC9GYXg+CiAgICAgICAgICAgIDxGdWxsQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxBZGRyZXNzPjEyIE9yY2hlc3RyYSBUZXJyYWNlPC9BZGRyZXNzPgogICAgICAgICAgICAgICAgPENpdHk+V2FsbGEgV2FsbGE8L0NpdHk+CiAgICAgICAgICAgICAgICA8UmVnaW9uPldBPC9SZWdpb24+CiAgICAgICAgICAgICAgICA8UG9zdGFsQ29kZT45OTM2MjwvUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxDb3VudHJ5PlVTQTwvQ291bnRyeT4KICAgICAgICAgICAgPC9GdWxsQWRkcmVzcz4KICAgICAgICA8L0N1c3RvbWVyPgogICAgICAgIDxDdXN0b21lciBDdXN0b21lcklEPSJMRVRTUyI+CiAgICAgICAgICAgIDxDb21wYW55TmFtZT5MZXQncyBTdG9wIE4gU2hvcDwvQ29tcGFueU5hbWU+CiAgICAgICAgICAgIDxDb250YWN0TmFtZT5KYWltZSBZb3JyZXM8L0NvbnRhY3ROYW1lPgogICAgICAgICAgICA8Q29udGFjdFRpdGxlPk93bmVyPC9Db250YWN0VGl0bGU+CiAgICAgICAgICAgIDxQaG9uZT4oNDE1KSA1NTUtNTkzODwvUGhvbmU+CiAgICAgICAgICAgIDxGdWxsQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxBZGRyZXNzPjg3IFBvbGsgU3QuIFN1aXRlIDU8L0FkZHJlc3M+CiAgICAgICAgICAgICAgICA8Q2l0eT5TYW4gRnJhbmNpc2NvPC9DaXR5PgogICAgICAgICAgICAgICAgPFJlZ2lvbj5DQTwvUmVnaW9uPgogICAgICAgICAgICAgICAgPFBvc3RhbENvZGU+OTQxMTc8L1Bvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8Q291bnRyeT5VU0E8L0NvdW50cnk+CiAgICAgICAgICAgIDwvRnVsbEFkZHJlc3M+CiAgICAgICAgPC9DdXN0b21lcj4KICAgIDwvQ3VzdG9tZXJzPgogICAgPE9yZGVycz4KICAgICAgICA8T3JkZXI+CiAgICAgICAgICAgIDxDdXN0b21lcklEPkdSRUFMPC9DdXN0b21lcklEPgogICAgICAgICAgICA8RW1wbG95ZWVJRD42PC9FbXBsb3llZUlEPgogICAgICAgICAgICA8T3JkZXJEYXRlPjE5OTctMDUtMDZUMDA6MDA6MDA8L09yZGVyRGF0ZT4KICAgICAgICAgICAgPFJlcXVpcmVkRGF0ZT4xOTk3LTA1LTIwVDAwOjAwOjAwPC9SZXF1aXJlZERhdGU+CiAgICAgICAgICAgIDxTaGlwSW5mbyBTaGlwcGVkRGF0ZT0iMTk5Ny0wNS0wOVQwMDowMDowMCI+CiAgICAgICAgICAgICAgICA8U2hpcFZpYT4yPC9TaGlwVmlhPgogICAgICAgICAgICAgICAgPEZyZWlnaHQ+My4zNTwvRnJlaWdodD4KICAgICAgICAgICAgICAgIDxTaGlwTmFtZT5HcmVhdCBMYWtlcyBGb29kIE1hcmtldDwvU2hpcE5hbWU+CiAgICAgICAgICAgICAgICA8U2hpcEFkZHJlc3M+MjczMiBCYWtlciBCbHZkLjwvU2hpcEFkZHJlc3M+CiAgICAgICAgICAgICAgICA8U2hpcENpdHk+RXVnZW5lPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPk9SPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk3NDAzPC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5HUkVBTDwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+ODwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk3LTA3LTA0VDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5Ny0wOC0wMVQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTctMDctMTRUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MjwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjQuNDI8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+R3JlYXQgTGFrZXMgRm9vZCBNYXJrZXQ8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPjI3MzIgQmFrZXIgQmx2ZC48L1NoaXBBZGRyZXNzPgogICAgICAgICAgICAgICAgPFNoaXBDaXR5PkV1Z2VuZTwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5PUjwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45NzQwMzwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+R1JFQUw8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjE8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5Ny0wNy0zMVQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTctMDgtMjhUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk3LTA4LTA1VDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjI8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4xMTYuNTM8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+R3JlYXQgTGFrZXMgRm9vZCBNYXJrZXQ8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPjI3MzIgQmFrZXIgQmx2ZC48L1NoaXBBZGRyZXNzPgogICAgICAgICAgICAgICAgPFNoaXBDaXR5PkV1Z2VuZTwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5PUjwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45NzQwMzwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+R1JFQUw8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjQ8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5Ny0wNy0zMVQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTctMDgtMjhUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk3LTA4LTA0VDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjI8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4xOC41MzwvRnJlaWdodD4KICAgICAgICAgICAgICAgIDxTaGlwTmFtZT5HcmVhdCBMYWtlcyBGb29kIE1hcmtldDwvU2hpcE5hbWU+CiAgICAgICAgICAgICAgICA8U2hpcEFkZHJlc3M+MjczMiBCYWtlciBCbHZkLjwvU2hpcEFkZHJlc3M+CiAgICAgICAgICAgICAgICA8U2hpcENpdHk+RXVnZW5lPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPk9SPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk3NDAzPC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5HUkVBTDwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+NjwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk3LTA5LTA0VDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5Ny0xMC0wMlQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTctMDktMTBUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MTwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjU3LjE1PC9GcmVpZ2h0PgogICAgICAgICAgICAgICAgPFNoaXBOYW1lPkdyZWF0IExha2VzIEZvb2QgTWFya2V0PC9TaGlwTmFtZT4KICAgICAgICAgICAgICAgIDxTaGlwQWRkcmVzcz4yNzMyIEJha2VyIEJsdmQuPC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5FdWdlbmU8L1NoaXBDaXR5PgogICAgICAgICAgICAgICAgPFNoaXBSZWdpb24+T1I8L1NoaXBSZWdpb24+CiAgICAgICAgICAgICAgICA8U2hpcFBvc3RhbENvZGU+OTc0MDM8L1NoaXBQb3N0YWxDb2RlPgogICAgICAgICAgICAgICAgPFNoaXBDb3VudHJ5PlVTQTwvU2hpcENvdW50cnk+CiAgICAgICAgICAgIDwvU2hpcEluZm8+CiAgICAgICAgPC9PcmRlcj4KICAgICAgICA8T3JkZXI+CiAgICAgICAgICAgIDxDdXN0b21lcklEPkdSRUFMPC9DdXN0b21lcklEPgogICAgICAgICAgICA8RW1wbG95ZWVJRD4zPC9FbXBsb3llZUlEPgogICAgICAgICAgICA8T3JkZXJEYXRlPjE5OTctMDktMjVUMDA6MDA6MDA8L09yZGVyRGF0ZT4KICAgICAgICAgICAgPFJlcXVpcmVkRGF0ZT4xOTk3LTEwLTIzVDAwOjAwOjAwPC9SZXF1aXJlZERhdGU+CiAgICAgICAgICAgIDxTaGlwSW5mbyBTaGlwcGVkRGF0ZT0iMTk5Ny0wOS0zMFQwMDowMDowMCI+CiAgICAgICAgICAgICAgICA8U2hpcFZpYT4zPC9TaGlwVmlhPgogICAgICAgICAgICAgICAgPEZyZWlnaHQ+NzYuMTM8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+R3JlYXQgTGFrZXMgRm9vZCBNYXJrZXQ8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPjI3MzIgQmFrZXIgQmx2ZC48L1NoaXBBZGRyZXNzPgogICAgICAgICAgICAgICAgPFNoaXBDaXR5PkV1Z2VuZTwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5PUjwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45NzQwMzwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+R1JFQUw8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjQ8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5OC0wMS0wNlQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTgtMDItMDNUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk4LTAyLTA0VDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjI8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD43MTkuNzg8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+R3JlYXQgTGFrZXMgRm9vZCBNYXJrZXQ8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPjI3MzIgQmFrZXIgQmx2ZC48L1NoaXBBZGRyZXNzPgogICAgICAgICAgICAgICAgPFNoaXBDaXR5PkV1Z2VuZTwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5PUjwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45NzQwMzwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+R1JFQUw8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjM8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5OC0wMy0wOVQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTgtMDQtMDZUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk4LTAzLTE4VDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjI8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4zMy42ODwvRnJlaWdodD4KICAgICAgICAgICAgICAgIDxTaGlwTmFtZT5HcmVhdCBMYWtlcyBGb29kIE1hcmtldDwvU2hpcE5hbWU+CiAgICAgICAgICAgICAgICA8U2hpcEFkZHJlc3M+MjczMiBCYWtlciBCbHZkLjwvU2hpcEFkZHJlc3M+CiAgICAgICAgICAgICAgICA8U2hpcENpdHk+RXVnZW5lPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPk9SPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk3NDAzPC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5HUkVBTDwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+MzwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk4LTA0LTA3VDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5OC0wNS0wNVQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTgtMDQtMTVUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MjwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjI1LjE5PC9GcmVpZ2h0PgogICAgICAgICAgICAgICAgPFNoaXBOYW1lPkdyZWF0IExha2VzIEZvb2QgTWFya2V0PC9TaGlwTmFtZT4KICAgICAgICAgICAgICAgIDxTaGlwQWRkcmVzcz4yNzMyIEJha2VyIEJsdmQuPC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5FdWdlbmU8L1NoaXBDaXR5PgogICAgICAgICAgICAgICAgPFNoaXBSZWdpb24+T1I8L1NoaXBSZWdpb24+CiAgICAgICAgICAgICAgICA8U2hpcFBvc3RhbENvZGU+OTc0MDM8L1NoaXBQb3N0YWxDb2RlPgogICAgICAgICAgICAgICAgPFNoaXBDb3VudHJ5PlVTQTwvU2hpcENvdW50cnk+CiAgICAgICAgICAgIDwvU2hpcEluZm8+CiAgICAgICAgPC9PcmRlcj4KICAgICAgICA8T3JkZXI+CiAgICAgICAgICAgIDxDdXN0b21lcklEPkdSRUFMPC9DdXN0b21lcklEPgogICAgICAgICAgICA8RW1wbG95ZWVJRD40PC9FbXBsb3llZUlEPgogICAgICAgICAgICA8T3JkZXJEYXRlPjE5OTgtMDQtMjJUMDA6MDA6MDA8L09yZGVyRGF0ZT4KICAgICAgICAgICAgPFJlcXVpcmVkRGF0ZT4xOTk4LTA1LTIwVDAwOjAwOjAwPC9SZXF1aXJlZERhdGU+CiAgICAgICAgICAgIDxTaGlwSW5mbz4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjM8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4xOC44NDwvRnJlaWdodD4KICAgICAgICAgICAgICAgIDxTaGlwTmFtZT5HcmVhdCBMYWtlcyBGb29kIE1hcmtldDwvU2hpcE5hbWU+CiAgICAgICAgICAgICAgICA8U2hpcEFkZHJlc3M+MjczMiBCYWtlciBCbHZkLjwvU2hpcEFkZHJlc3M+CiAgICAgICAgICAgICAgICA8U2hpcENpdHk+RXVnZW5lPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPk9SPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk3NDAzPC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5HUkVBTDwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+NDwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk4LTA0LTMwVDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5OC0wNi0xMVQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8+CiAgICAgICAgICAgICAgICA8U2hpcFZpYT4zPC9TaGlwVmlhPgogICAgICAgICAgICAgICAgPEZyZWlnaHQ+MTQuMDE8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+R3JlYXQgTGFrZXMgRm9vZCBNYXJrZXQ8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPjI3MzIgQmFrZXIgQmx2ZC48L1NoaXBBZGRyZXNzPgogICAgICAgICAgICAgICAgPFNoaXBDaXR5PkV1Z2VuZTwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5PUjwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45NzQwMzwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+SFVOR0M8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjM8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5Ni0xMi0wNlQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTctMDEtMDNUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk2LTEyLTA5VDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjI8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4yMC4xMjwvRnJlaWdodD4KICAgICAgICAgICAgICAgIDxTaGlwTmFtZT5IdW5ncnkgQ295b3RlIEltcG9ydCBTdG9yZTwvU2hpcE5hbWU+CiAgICAgICAgICAgICAgICA8U2hpcEFkZHJlc3M+Q2l0eSBDZW50ZXIgUGxhemEgNTE2IE1haW4gU3QuPC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5FbGdpbjwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5PUjwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45NzgyNzwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+SFVOR0M8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjE8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5Ni0xMi0yNVQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTctMDEtMjJUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk3LTAxLTAzVDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjM8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4zMC4zNDwvRnJlaWdodD4KICAgICAgICAgICAgICAgIDxTaGlwTmFtZT5IdW5ncnkgQ295b3RlIEltcG9ydCBTdG9yZTwvU2hpcE5hbWU+CiAgICAgICAgICAgICAgICA8U2hpcEFkZHJlc3M+Q2l0eSBDZW50ZXIgUGxhemEgNTE2IE1haW4gU3QuPC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5FbGdpbjwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5PUjwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45NzgyNzwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+SFVOR0M8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjM8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5Ny0wMS0xNVQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTctMDItMTJUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk3LTAxLTI0VDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjE8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4wLjI8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+SHVuZ3J5IENveW90ZSBJbXBvcnQgU3RvcmU8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPkNpdHkgQ2VudGVyIFBsYXphIDUxNiBNYWluIFN0LjwvU2hpcEFkZHJlc3M+CiAgICAgICAgICAgICAgICA8U2hpcENpdHk+RWxnaW48L1NoaXBDaXR5PgogICAgICAgICAgICAgICAgPFNoaXBSZWdpb24+T1I8L1NoaXBSZWdpb24+CiAgICAgICAgICAgICAgICA8U2hpcFBvc3RhbENvZGU+OTc4Mjc8L1NoaXBQb3N0YWxDb2RlPgogICAgICAgICAgICAgICAgPFNoaXBDb3VudHJ5PlVTQTwvU2hpcENvdW50cnk+CiAgICAgICAgICAgIDwvU2hpcEluZm8+CiAgICAgICAgPC9PcmRlcj4KICAgICAgICA8T3JkZXI+CiAgICAgICAgICAgIDxDdXN0b21lcklEPkhVTkdDPC9DdXN0b21lcklEPgogICAgICAgICAgICA8RW1wbG95ZWVJRD40PC9FbXBsb3llZUlEPgogICAgICAgICAgICA8T3JkZXJEYXRlPjE5OTctMDctMTZUMDA6MDA6MDA8L09yZGVyRGF0ZT4KICAgICAgICAgICAgPFJlcXVpcmVkRGF0ZT4xOTk3LTA4LTEzVDAwOjAwOjAwPC9SZXF1aXJlZERhdGU+CiAgICAgICAgICAgIDxTaGlwSW5mbyBTaGlwcGVkRGF0ZT0iMTk5Ny0wNy0yMVQwMDowMDowMCI+CiAgICAgICAgICAgICAgICA8U2hpcFZpYT4xPC9TaGlwVmlhPgogICAgICAgICAgICAgICAgPEZyZWlnaHQ+NDUuMTM8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+SHVuZ3J5IENveW90ZSBJbXBvcnQgU3RvcmU8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPkNpdHkgQ2VudGVyIFBsYXphIDUxNiBNYWluIFN0LjwvU2hpcEFkZHJlc3M+CiAgICAgICAgICAgICAgICA8U2hpcENpdHk+RWxnaW48L1NoaXBDaXR5PgogICAgICAgICAgICAgICAgPFNoaXBSZWdpb24+T1I8L1NoaXBSZWdpb24+CiAgICAgICAgICAgICAgICA8U2hpcFBvc3RhbENvZGU+OTc4Mjc8L1NoaXBQb3N0YWxDb2RlPgogICAgICAgICAgICAgICAgPFNoaXBDb3VudHJ5PlVTQTwvU2hpcENvdW50cnk+CiAgICAgICAgICAgIDwvU2hpcEluZm8+CiAgICAgICAgPC9PcmRlcj4KICAgICAgICA8T3JkZXI+CiAgICAgICAgICAgIDxDdXN0b21lcklEPkhVTkdDPC9DdXN0b21lcklEPgogICAgICAgICAgICA8RW1wbG95ZWVJRD44PC9FbXBsb3llZUlEPgogICAgICAgICAgICA8T3JkZXJEYXRlPjE5OTctMDktMDhUMDA6MDA6MDA8L09yZGVyRGF0ZT4KICAgICAgICAgICAgPFJlcXVpcmVkRGF0ZT4xOTk3LTEwLTA2VDAwOjAwOjAwPC9SZXF1aXJlZERhdGU+CiAgICAgICAgICAgIDxTaGlwSW5mbyBTaGlwcGVkRGF0ZT0iMTk5Ny0xMC0xNVQwMDowMDowMCI+CiAgICAgICAgICAgICAgICA8U2hpcFZpYT4xPC9TaGlwVmlhPgogICAgICAgICAgICAgICAgPEZyZWlnaHQ+MTExLjI5PC9GcmVpZ2h0PgogICAgICAgICAgICAgICAgPFNoaXBOYW1lPkh1bmdyeSBDb3lvdGUgSW1wb3J0IFN0b3JlPC9TaGlwTmFtZT4KICAgICAgICAgICAgICAgIDxTaGlwQWRkcmVzcz5DaXR5IENlbnRlciBQbGF6YSA1MTYgTWFpbiBTdC48L1NoaXBBZGRyZXNzPgogICAgICAgICAgICAgICAgPFNoaXBDaXR5PkVsZ2luPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPk9SPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk3ODI3PC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5MQVpZSzwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+MTwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk3LTAzLTIxVDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5Ny0wNC0xOFQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTctMDQtMTBUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MzwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjcuNDg8L0ZyZWlnaHQ+CiAgICAgICAgICAgICAgICA8U2hpcE5hbWU+TGF6eSBLIEtvdW50cnkgU3RvcmU8L1NoaXBOYW1lPgogICAgICAgICAgICAgICAgPFNoaXBBZGRyZXNzPjEyIE9yY2hlc3RyYSBUZXJyYWNlPC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5XYWxsYSBXYWxsYTwvU2hpcENpdHk+CiAgICAgICAgICAgICAgICA8U2hpcFJlZ2lvbj5XQTwvU2hpcFJlZ2lvbj4KICAgICAgICAgICAgICAgIDxTaGlwUG9zdGFsQ29kZT45OTM2MjwvU2hpcFBvc3RhbENvZGU+CiAgICAgICAgICAgICAgICA8U2hpcENvdW50cnk+VVNBPC9TaGlwQ291bnRyeT4KICAgICAgICAgICAgPC9TaGlwSW5mbz4KICAgICAgICA8L09yZGVyPgogICAgICAgIDxPcmRlcj4KICAgICAgICAgICAgPEN1c3RvbWVySUQ+TEFaWUs8L0N1c3RvbWVySUQ+CiAgICAgICAgICAgIDxFbXBsb3llZUlEPjg8L0VtcGxveWVlSUQ+CiAgICAgICAgICAgIDxPcmRlckRhdGU+MTk5Ny0wNS0yMlQwMDowMDowMDwvT3JkZXJEYXRlPgogICAgICAgICAgICA8UmVxdWlyZWREYXRlPjE5OTctMDYtMTlUMDA6MDA6MDA8L1JlcXVpcmVkRGF0ZT4KICAgICAgICAgICAgPFNoaXBJbmZvIFNoaXBwZWREYXRlPSIxOTk3LTA2LTI2VDAwOjAwOjAwIj4KICAgICAgICAgICAgICAgIDxTaGlwVmlhPjI8L1NoaXBWaWE+CiAgICAgICAgICAgICAgICA8RnJlaWdodD4xMS45MjwvRnJlaWdodD4KICAgICAgICAgICAgICAgIDxTaGlwTmFtZT5MYXp5IEsgS291bnRyeSBTdG9yZTwvU2hpcE5hbWU+CiAgICAgICAgICAgICAgICA8U2hpcEFkZHJlc3M+MTIgT3JjaGVzdHJhIFRlcnJhY2U8L1NoaXBBZGRyZXNzPgogICAgICAgICAgICAgICAgPFNoaXBDaXR5PldhbGxhIFdhbGxhPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPldBPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk5MzYyPC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5MRVRTUzwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+MTwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk3LTA2LTI1VDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5Ny0wNy0yM1QwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTctMDctMDRUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MjwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjEzLjczPC9GcmVpZ2h0PgogICAgICAgICAgICAgICAgPFNoaXBOYW1lPkxldCdzIFN0b3AgTiBTaG9wPC9TaGlwTmFtZT4KICAgICAgICAgICAgICAgIDxTaGlwQWRkcmVzcz44NyBQb2xrIFN0LiBTdWl0ZSA1PC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5TYW4gRnJhbmNpc2NvPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPkNBPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk0MTE3PC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5MRVRTUzwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+ODwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk3LTEwLTI3VDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5Ny0xMS0yNFQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTctMTEtMDVUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MjwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjUxLjQ0PC9GcmVpZ2h0PgogICAgICAgICAgICAgICAgPFNoaXBOYW1lPkxldCdzIFN0b3AgTiBTaG9wPC9TaGlwTmFtZT4KICAgICAgICAgICAgICAgIDxTaGlwQWRkcmVzcz44NyBQb2xrIFN0LiBTdWl0ZSA1PC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5TYW4gRnJhbmNpc2NvPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPkNBPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk0MTE3PC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5MRVRTUzwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+NjwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk3LTExLTEwVDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5Ny0xMi0wOFQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTctMTEtMjFUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MjwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjQ1Ljk3PC9GcmVpZ2h0PgogICAgICAgICAgICAgICAgPFNoaXBOYW1lPkxldCdzIFN0b3AgTiBTaG9wPC9TaGlwTmFtZT4KICAgICAgICAgICAgICAgIDxTaGlwQWRkcmVzcz44NyBQb2xrIFN0LiBTdWl0ZSA1PC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5TYW4gRnJhbmNpc2NvPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPkNBPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk0MTE3PC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICAgICAgPE9yZGVyPgogICAgICAgICAgICA8Q3VzdG9tZXJJRD5MRVRTUzwvQ3VzdG9tZXJJRD4KICAgICAgICAgICAgPEVtcGxveWVlSUQ+NDwvRW1wbG95ZWVJRD4KICAgICAgICAgICAgPE9yZGVyRGF0ZT4xOTk4LTAyLTEyVDAwOjAwOjAwPC9PcmRlckRhdGU+CiAgICAgICAgICAgIDxSZXF1aXJlZERhdGU+MTk5OC0wMy0xMlQwMDowMDowMDwvUmVxdWlyZWREYXRlPgogICAgICAgICAgICA8U2hpcEluZm8gU2hpcHBlZERhdGU9IjE5OTgtMDItMTNUMDA6MDA6MDAiPgogICAgICAgICAgICAgICAgPFNoaXBWaWE+MjwvU2hpcFZpYT4KICAgICAgICAgICAgICAgIDxGcmVpZ2h0PjkwLjk3PC9GcmVpZ2h0PgogICAgICAgICAgICAgICAgPFNoaXBOYW1lPkxldCdzIFN0b3AgTiBTaG9wPC9TaGlwTmFtZT4KICAgICAgICAgICAgICAgIDxTaGlwQWRkcmVzcz44NyBQb2xrIFN0LiBTdWl0ZSA1PC9TaGlwQWRkcmVzcz4KICAgICAgICAgICAgICAgIDxTaGlwQ2l0eT5TYW4gRnJhbmNpc2NvPC9TaGlwQ2l0eT4KICAgICAgICAgICAgICAgIDxTaGlwUmVnaW9uPkNBPC9TaGlwUmVnaW9uPgogICAgICAgICAgICAgICAgPFNoaXBQb3N0YWxDb2RlPjk0MTE3PC9TaGlwUG9zdGFsQ29kZT4KICAgICAgICAgICAgICAgIDxTaGlwQ291bnRyeT5VU0E8L1NoaXBDb3VudHJ5PgogICAgICAgICAgICA8L1NoaXBJbmZvPgogICAgICAgIDwvT3JkZXI+CiAgICA8L09yZGVycz4KPC9Sb290Pg==</transactionData>
      <transactionRange>1</transactionRange>
      <transactionDataType>string</transactionDataType>
    </documentRequest>
    `;// XML data to send
    const requestData = {
      url: 'https://na10-sb.smartcommunications.cloud/one/oauth1/api/v12/job/generateDocument?includeDocumentData=true',
      method: 'POST',
      data: requestBody,
    };

    const headers = oauth.toHeader(oauth.authorize(requestData));

    try {
      const response = await fetch(requestData.url, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/xml', // Set content type to XML
          'Accept': 'application/xml',
        },
        body: requestBody,
      });

      const responseData = await response.text();
      console.log('requestData= ',responseData)
      setResponseData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <UserList />
      <button onClick={postData}>Hit API</button>
     {/* {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>} */}
    </div>
  );
};

export default Home;
