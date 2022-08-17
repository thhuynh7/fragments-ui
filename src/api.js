// src/api.js

// fragments microservice API, defaults to localhost:8080
// const apiUrl = process.env.API_URL || 'http://localhost:8080';
// const apiUrl = 'http://fragments-env.eba-qg6zifpm.us-east-1.elasticbeanstalk.com';
const apiUrl = 'http://fragments-env.eba-qg6zifpm.us-east-1.elasticbeanstalk.com';

export async function getUserFragments(user) {

  let ul = document.querySelector('ul');
  let h3 = document.querySelector('h3');

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
    
    h3.innerHTML = `You have ${data.fragments.length} existing fragment(s):`;

    for (var i = 0; i < data.fragments.length; i++) { 
      let li = document.createElement('li')
      ul.appendChild(li).innerHTML = data.fragments[i]; 
    }

  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function postUserFragment(user) {
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
}

export async function deleteUserFragment(user, x) {
  console.log('Deleting a fragment...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${x}`, {
      method: "POST",
      // body: "This is a fragment",
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
}


//////////////
export async function getFragmentMetadata(user, fragmentId) {

  let ol = document.querySelector('ol');
  let h4 = document.querySelector('h4');

  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${fragmentId}/info`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments info', { data });
    
    h4.innerHTML = `Metadata for the Fragment ${fragmentId}:`;
    
    {
      let li = document.createElement('li')
      ol.appendChild(li).innerHTML = `id: ${data.fragments.id}`;
    }
    {
      let li = document.createElement('li')
      ol.appendChild(li).innerHTML = `Created: ${data.fragments.created}`;
    }
    {
      let li = document.createElement('li')
      ol.appendChild(li).innerHTML = `OwnerId: ${data.fragments.ownerId}`;
    }
    {
      let li = document.createElement('li')
      ol.appendChild(li).innerHTML = `Updated: ${data.fragments.updated}`;
    }
    {
      let li = document.createElement('li')
      ol.appendChild(li).innerHTML = `Size: ${data.fragments.size}`;
    }
    {
      let li = document.createElement('li')
      ol.appendChild(li).innerHTML = `Type: ${data.fragments.type}`;
    }
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}