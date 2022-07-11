import { useForm } from "react-hook-form";
import { schema } from "../../validators/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import * as S from "./styles";
import { useState } from "react";
import Api from '../../api';
import api from "../../api";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  username: string;
  password: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: LoginProps) => {
    const response = api.login({username: data.username, password: data.password}).then((response) => {
      if(response.data.token) {
        localStorage.setItem("access_token", response.data.id);
        navigate("/");
      }
    }).catch((err) => {
      if(err.response.status == 400) {
        alert("Wrong Credentials");
      } else {
        alert("Something Went Wrong try again later");
      }
    });
    
  };

  return (
    <S.Wrapper>
      <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <S.DoubleContainer>
          <Input
              {...register("username")}
              errors={errors.username}
              label="Username"
            />
            <Input
              {...register("password")}
              errors={errors.password}
              type="password"
              label="Password"
            />
          </S.DoubleContainer>

          <S.WrapperButton>
            <button className="btn-hover" type="submit">
              Submit
            </button>
          </S.WrapperButton>
          <S.WrapperButton>
            <button onClick={() => navigate("/signup")} className="btn-hover" type="button">
              Create Account
            </button>
          </S.WrapperButton>
        </form>
    </S.Wrapper>
  );
};

export default Form;