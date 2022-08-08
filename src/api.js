// src/api.js

// fragments microservice API, defaults to localhost:8080
// const apiUrl = process.env.API_URL || 'http://localhost:8080';
// const apiUrl = 'http://fragments-env.eba-qg6zifpm.us-east-1.elasticbeanstalk.com';
const apiUrl = 'http://fragments-env.eba-qg6zifpm.us-east-1.elasticbeanstalk.com';

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {

  let fragment;
  let fragments;

  console.log('Posting a new text fragment...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      body: "This is a fragment",
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('New fragment posted', { data });
    // alert(`${data.fragment.id} created`);
    fragment = data.fragment.id;
  } catch (err) {
    console.error('Unable to call POST /v1/fragment', { err });
  }

  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments data', { data });
    alert(`** New Fragment created: ${fragment} ** Fragments of current user: ${data.fragments}`);
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}