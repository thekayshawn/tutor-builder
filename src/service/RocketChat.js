// import axios from 'axios';
// import React, { Component } from "react";
// import { ROCKET_CHAT_URL } from './RocketChatConfig';
// import CryptoJS from 'crypto-js';
// import {store} from '../store';
// import { GiCoinsPile } from 'react-icons/gi';

// export default class RocketChat extends Component {

//     getCurrentStateFromStore() {
//         return {
//           user: store.getState().auth
//         }
//       }

//     base64url(source) {
//         const encodedWord = CryptoJS.enc.Utf8.parse(source); // encodedWord Array object
//         const encoded = CryptoJS.enc.Base64.stringify(encodedWord); // string: 'NzUzMjI1NDE='
//         return encoded;
//     }

//     async rocketChat() {
//         let state = this.getCurrentStateFromStore()
//         console.log(state.user)
//         let email = state.user.userDetails.email
//         var username = email.split('@').shift();
//         let pattern = /[+*\n]|^\d+/g;
//         username = username
//         .replace(pattern, "_")
//         .replace(/[ ]{2,}/g, "_")
//         .trim();
//         let password = this.base64url(username);
//         let loginChat = await this.rocketChatLogin(username, password);

//         if (loginChat.status && loginChat.status !== 'error' && loginChat.data.authToken) {
//             localStorage.setItem('chatToken', loginChat.data.authToken);
//         }

//     }

//     async rocketChatLogin(username, password) {
//         const response = await axios({
//             method: 'post',
//             url: ROCKET_CHAT_URL + 'login',
//             data: {
//                 'username': username,
//                 'password': password
//             },
//             headers: {
//                 'Accept': 'application/json'
//             },
//             validateStatus: function (status) {
//                 return status >= 200 && status < 400
//             }
//         })
//             .then((response) => {
//                 return response.data;
//             })
//             .catch((error) => {
//                 if (error.response) {
//                     return error.response.data;
//                 }
//             });
//         return response;
//     }
// }
