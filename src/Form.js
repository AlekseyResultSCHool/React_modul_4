import { React, useState } from 'react';
import styles from './Style.module.css';

export const Form = () => {
	
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		validatePassword: '',
	});
	const [formErrors, setFormErrors] = useState({ info: ''});

	const handleInputChange = ({ target }) => {
		const { name, value } = target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));

		if (name === 'password' && value.length > 10) {
			setFormErrors((prevState) => ({
				...prevState,
				info: 'Пароль не верен. Должно быть не больше 10 символов',
			}));
		} else if (name === 'password' && !/^[\w_]*$/.test(value)) {
			setFormErrors((prevState) => ({
				...prevState,
				info: 'Пароль не верен. Допустимые символы: латинские буквы, цифры и нижнее подчёркивание',
			}));
		} else {
			setFormErrors((prevState) => ({
				...prevState,
				info: null,
			}));
		}
	};

	const onBlur = ({ target }) => {
		if (target.value.length < 3) {
			setFormErrors((prevState) => ({
				...prevState,
				info: ' Неверено. Должно быть не меньше 3 символов',
			}));
		} else {
			setFormErrors((prevState) => ({
				...prevState,
				info: null,
			}));
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		if (formData.password !== formData.validatePassword) {
			setFormErrors((prevState) => ({
				...prevState,
				info: 'пароли не совпадают',
			}));
		} else {
			console.log(formData);
		}
	};

	return (
		<div className={styles.form}>
			<div className={styles.infoErrorText}>
				{formErrors.info && (
					<div className={styles.errortext}>{formErrors.info}</div>
				)}
			</div>
			<form onSubmit={onSubmit}>
				<input
					className={styles.input}
					name="email"
					type="email"
					placeholder="Введите Вашу почту"
					value={formData.email}
					onChange={handleInputChange}
					onBlur={onBlur}
					required
				/>
				<input
					className={styles.input}
					name="password"
					type="password"
					placeholder="Пароль"
					value={formData.password}
					onChange={handleInputChange}
					onBlur={onBlur}
					required
				/>
				<input
					className={styles.input}
					name="validatePassword"
					type="password"
					placeholder="Повторите Пароль"
					value={formData.validatePassword}
					onChange={handleInputChange}
					onBlur={onBlur}
					required
				/>
				<button
					type="submit"
					className={styles.displayButton}
					disabled={formErrors.info}
				>
					Зарегистрироваться
				</button>
				</form>
		</div>
	);
}
