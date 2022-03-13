import { useQuery } from "react-query";
import { request, gql } from "graphql-request";

export const endpoint = "https://zohodemo.herokuapp.com/graphql";

export const useLogin = (inputValue, handle) => {
  return useQuery(
    "login",
    async () => {
      if (handle && inputValue.email !== "" && inputValue.password !== "") {
        const { user } = await request(
          endpoint,
          gql`
            query {
              user(user:"${inputValue.email}",password:"${inputValue.password}"){
                _id
                email
                token
              }
            }
      `
        );
        return user;
      }
    },
    { enabled: inputValue.email !== "" && inputValue.password !== "" }
  );
};

export const useSignUp = (inputValue, handle) => {
  return useQuery(
    "signup",
    async () => {
      if (
        handle &&
        inputValue.email !== "" &&
        inputValue.password !== "" &&
        inputValue.secret !== ""
      ) {
        const { signUpUser } = await request(
          endpoint,
          gql`
        mutation {
          signUpUser(email: "${inputValue.email}", password: "${inputValue.password}", secret: "${inputValue.secret}") {
            _id
            email
            token
          }
        }
      `
        );
        return signUpUser;
      }
    },
    {
      enabled:
        inputValue.email !== "" &&
        inputValue.password !== "" &&
        inputValue.secret !== "",
    }
  );
};

export const useContacts = (userId) => {
  return useQuery(
    "contacts",
    async () => {
      if (userId !== "") {
        const { contacts } = await request(
          endpoint,
          gql`
        query {
          contacts(userId: "${userId}") {
            _id
            name
            phone
            email
          }
        }
      `
        );
        return contacts;
      }
    },
    { enabled: userId !== "" }
  );
};

export const useAddContacts = (userId, inputValue, handle) => {
  return useQuery(
    "add contact",
    async () => {
      if (
        handle &&
        userId !== "" &&
        inputValue.email !== "" &&
        inputValue.password !== "" &&
        inputValue.name !== ""
      ) {
        const { signUpUser } = await request(
          endpoint,
          gql`
          mutation {
            createContact(
              userId: "${userId}"
              name: "${inputValue.name}"
              phone: "${inputValue.phone}"
              email: "${inputValue.email}"
            ) {
              _id
              userId
              createdAt
              name
            }
          }
        `
        );
        return signUpUser;
      }
    },
    {
      enabled:
        userId !== "" &&
        inputValue.email !== "" &&
        inputValue.password !== "" &&
        inputValue.name !== "",
    }
  );
};
