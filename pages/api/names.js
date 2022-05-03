// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch';

export default function handler(req, res) {
  if (req.method === 'POST') {
    let name = JSON.parse(req.body);
    console.log('🚀 ~ file: names.js ~ line 7 ~ handler ~ name', name);

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
    myHeaders.append('Authorization', process.env.JIRA_API_KEY);

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      `https://bigcommercecloud.atlassian.net/rest/api/3/user/picker?query=${name}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => res.send(data))
      .catch((error) => console.log(error));
  }

  // let projectId = JSON.parse(req.body).projectId;
  // let branchId = JSON.parse(req.body).branch;
  // res.status(200).json({ pmuid: '55555' });
  //   }
}
