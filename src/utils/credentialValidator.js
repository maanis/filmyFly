export const credentialValidator = (email, password) => {
    // const nameValidate = name.length >= 3
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const passwordValidate = password.length >= 6

    // if (!nameValidate) return 'Name must be 3 characters long'
    if (!emailValidate) return 'Invalid email';
    if (!passwordValidate) return 'Password should be at least 6 characters long';
    return null
}