import { useForm } from "react-hook-form";
import { schema } from "../../validators/signupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import * as S from "./styles";
import Api from '../../api';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: RegisterProps) => {
    const response = Api.addUser(data);
    alert("User Created");
    navigate("/login");
  };

  return (
    <S.Wrapper>
      <h1>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.DoubleContainer>
            <Input
              {...register("firstName")}
              errors={errors.firstName}
              label="Name"
            />
            <Input
              {...register("lastName")}
              errors={errors.lastName}
              label="Last Name"
            />
          </S.DoubleContainer>
          <Input
              {...register("username")}
              errors={errors.username}
              label="Username"
            />

          <S.DoubleContainer>
            <Input
              {...register("password")}
              errors={errors.password}
              type="password"
              label="Password"
            />
            <Input
              {...register("confirmPassword")}
              errors={errors.confirmPassword}
              type="password"
              label="Confirm Password"
            />
          </S.DoubleContainer>

          <S.WrapperButton>
            <button className="btn-hover" type="submit">
              Submit
            </button>
          </S.WrapperButton>
        </form>
    </S.Wrapper>
  );
};

export default Form;