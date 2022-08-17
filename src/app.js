// src/app.js

import { Auth, getUser } from './auth';
import { getUserFragments } from './api';
import { postUserFragment } from './api';
import { deleteUserFragment } from './api';

import { getFragmentMetadata } from './api';

async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');

  // const createBtn = document.querySelector('#create');  
  const createForm = document.querySelector('#createForm');
  const createField = document.querySelector('#createField');

  const deleteForm = document.querySelector('#deleteForm');
  const deleteField = document.querySelector('#deleteField');

  const viewMetaForm = document.querySelector('#viewMetaForm');
  const viewMetaField = document.querySelector('#viewMetaField');


  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // createBtn.onclick = () => {
  //   postUserFragment(user);    
  // };
  createForm.addEventListener("submit", (e) => {
    e.preventDefault()
    postUserFragment(user);  
    createField.value = ""
    createField.focus()
  })

  
  deleteForm.addEventListener("submit", (e) => {
    e.preventDefault()
    deleteUserFragment(user, deleteField.value)  
    deleteField.value = ""
    deleteField.focus()
  })

  viewMetaForm.addEventListener("submit", (e) => {
    e.preventDefault()
    getFragmentMetadata(user, viewMetaField.value)  
    viewMetaField.value = ""
    viewMetaField.focus()
  })

  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  // Do an authenticated request to the fragments API server and log the result
  getUserFragments(user);
  // getFragmentMetadata(user, "d6358eb2-47ca-4bf6-9ac7-5f3f6a261684");
  // postUserFragment(user);
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);

