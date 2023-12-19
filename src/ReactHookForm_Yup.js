import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './Style.module.css';
import { useState } from 'react';

const schema = yup
	.object({
		email: yup.string().email('Введите верный email'),
		password: yup
			.string()
			.matches(
				/^[\w_]*$/,
				'Неверно. Допустимые символы: латинские буквы, цифры и нижнее подчёркивание',
			)
			.min(3, 'Неверный пароль. Должно быть не меньше 3 символов')
			.max(10, 'Неверный пароль. Должно быть не больше 10 символов'),
		validatePassword: yup
			.string()
			.oneOf([yup.ref('password')], 'Пароли не совпадают'),
	})
	.required();

export const ReactHookForm_Yup = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data) => {
		console.log(data);
		reset();
	};

	return (
		<div className={styles.form}>
			<div className={styles.infoErrorText}>
				{errors.email?.message && (
					<div className={styles.errortext}>{errors.email?.message}</div>
				)}
				{errors.password?.message && (
					<div className={styles.errortext}>{errors.password?.message}</div>
				)}
				{errors.validatePassword?.message && (
					<div className={styles.errortext}>
						{errors.validatePassword?.message}
					</div>
				)}
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					name="email"
					type="email"
					{...register('email')}
					className={styles.input}
					placeholder="Введите Вашу почту"
					required
				/>
				<input
					name="password"
					type="password"
					{...register('password')}
					className={styles.input}
					placeholder="Введите пароль"
					required
				/>
				<input
					name="validatePassword"
					type="password"
					{...register('validatePassword')}
					className={styles.input}
					placeholder="Повторите пароль"
					required
				/>
				<button
					type="submit"
					className={styles.displayButton}
					disabled={!isValid}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};