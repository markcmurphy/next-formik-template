// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch';

export default function handler(req, res) {
  if (req.method === 'POST') {
    let pmEmail = JSON.parse(req.body).email;

    // async function getUserByEmail(email) {
    function manageErrors(response) {
      if (!response.ok) {
        if (response.status == 404) {
          throw Error(response.statusText);
        }
        return; // will print '200 - ok'
      }
      return response;
    }

    let myHeaders = new Headers();
    myHeaders.append('Authorization');

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://bigcommercecloud.atlassian.net/rest/api/3/user/search?query=${pmEmail}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
    // }

    // let projectId = JSON.parse(req.body).projectId;
    // let branchId = JSON.parse(req.body).branch;
    // res.status(200).json({ pmuid: '55555' });
  }
}
