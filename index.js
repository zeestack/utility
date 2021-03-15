/*
This utility function leverage reccursion to finds a given property from a nested object.
if the property exists, it will inject the new properties given as in a populate function.

Author: Zahid Hussain
Date: March 11, 2021

*/

const _ = require("lodash");

const obj = {
  role: "contributor",
  email: "gmail@gmail.com",
  title: "Strategy",
  displayName: "Somebody else",
  dateCreated: 1609450490052,
  uid: "lBY3mFtOJxMHqVX8aHjhxbE32323",
  owner: {
    uid: "OXokJSZLnMYTpXcD8DHXBSALkDi1",
    email: "zahid@gmail.com",
    role: "owner",
    lastupdate: {
      uid: "OXokJSZLnMYTpXcD8DHXBSALkDi1",
      date: 1609450490052,
      email: "zahid@gmail.com",
      displayName: "Zahid",
    },
    displayName: "Zahid",
  },
  boardId: "CPIKEAdqc4w1yCNVTFrc",
  bGroups: [
    {
      bgTextColor: "#ffffff",
      bgName: "Stratcheck",
      lastupdate: {
        uid: "OXokJSZLnMYTpXcD8DHXBSALkDi1",
        email: "xyz@gmail.com",
        date: 1609572292268,
      },
      olive: {
        india: {
          gmail: {
            email: "gmail@gmail.com",
          },
        },
      },
      bgId: "c11fe77b-a7a3-45e5-821e-dbc9bde0b7f8",
      bgColor: "#f44e3b",
    },
  ],
};

function findProp(values, obj, key, populateCallbk) {
  _.map(obj, (item) => {
    if (typeof item === "object" || Array.isArray(item)) {
      if (item[key]) {
        item = populateCallbk(item);
      }
      return findProp(values, item, key, pops);
    } else {
      if (obj[key]) {
        if (values.findIndex((item) => item[key] === obj[key]) === -1) {
          return values.push({ [key]: obj[key] });
        }
      }
    }
  });
}

function findProps(obj, key) {
  const values = [];
  findProp(values, [obj], key, (object) => {
    object.displayName = "different name";
    object.age = "67";
    object.school = "Nellie Carlson School";
    return object; //important
  });
  return { values, obj };
}

const result = findProps(obj, "displayName");

console.log(result.values, result.obj);
