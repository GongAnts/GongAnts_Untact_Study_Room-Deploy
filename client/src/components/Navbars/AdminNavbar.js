/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { LOGOUT_REQUEST } from 'redux/types';
import { push } from 'react-router-redux';

import axios from 'axios';
import routes from 'routes.js';

function Header() {
  const location = useLocation();
  const mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    var node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  };

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    alert('로그아웃 하시겠습니까?');
    const config = { withCredentials: true };
    axios.get('http://localhost:4000/signout', config).then((req, res) => {
      dispatch({
        type: LOGOUT_REQUEST,
      });
    });
  }, [dispatch]);

  return (
    <div class="drawer-content flex flex-col">
      <div class="w-full navbar bg-base-200 drop-shadow-lg">
        <div class="flex-none lg:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div class="flex-1 px-2 mx-2">
          <a href="/">GongAnts</a>
        </div>
        <div class="flex-none hidden lg:block">
          <ul class="menu menu-horizontal">
            <li>
              <a>Navbar Item 1</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
