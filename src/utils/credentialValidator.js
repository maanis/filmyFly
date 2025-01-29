export const credentialValidator = (email, password) => {
    // const nameValidate = name.length >= 3
    const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const passwordValidate = password.length >= 4

    // if (!nameValidate) return 'Name must be 3 characters long'
    if (!emailValidate) return 'Invalid email';
    if (!passwordValidate) return 'Password must be at least 4 characters long';
    return null
}