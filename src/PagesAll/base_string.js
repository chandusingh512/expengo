import React from 'react';

class OAuthBaseStringGenerator extends React.Component {
  generateBaseString = (httpMethod, baseUrl, parameters) => {
    // Convert HTTP method to uppercase
    httpMethod = httpMethod.toUpperCase();

    // Percent-encode the base URL
    const encodedBaseUrl = encodeURIComponent(baseUrl);

    // Sort parameters alphabetically by key and percent-encode key-value pairs
    const encodedParams = Object.keys(parameters)
      .sort()
      .map(key => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(parameters[key]);
        return `${encodedKey}=${encodedValue}`;
      });

    // Join parameters with "&" and percent-encode the resulting string
    const encodedParamString = encodedParams.join('&');
    const encodedParamStringFinal = encodeURIComponent(encodedParamString);

    // Concatenate HTTP method, encoded base URL, and encoded parameter string
    const baseString = [httpMethod, encodedBaseUrl, encodedParamStringFinal].join('&');
    return baseString;
  };
  render() {
    // Example usage
    const httpMethod = "POST";
    const baseUrl = "https://na10-sb.smartcommunications.cloud/one/oauth1/api/v12/job/generateDocument?includeDocumentData=true";
    const parameters = {

        oauth_consumer_key:"8885859a-b6c7-49b8-8b6f-ba7a6feea368%21chandu.singh%40exavalu.dev.com",
        oauth_signature_method:"HMAC-SHA1",
        oauth_timestamp:"1714158577",
        oauth_nonce:"TJhMwKeXkWT",
        oauth_version:"1.0",
        oauth_signature:"Q0eWh%2BBBW%2BDrN1Vm5cxjfiqq3vY%3D"
    };

    const baseString = this.generateBaseString(httpMethod, baseUrl, parameters);
    
    return (
      <div>
        <h2>Generated Base String:</h2>
        <code>{baseString}</code>
      </div>
    );
  }
}

export default OAuthBaseStringGenerator;
