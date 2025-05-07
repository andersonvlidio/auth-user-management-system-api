function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const isValidBirthDate = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);

    const age = today.getFullYear() - birth.getFullYear();
    const has18Years =
        today.getMonth() > birth.getMonth() ||
        (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

    return age > 18 || (age === 18 && has18Years);
}

const isValidCPF = (cpf) => {
    const sanitizedCPF = cpf.replace(/[^\d]/g, '');

    if (sanitizedCPF.length !== 11) {
        return false;
    }
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(sanitizedCPF);
}

function isValidRole(role) {
    const validRoles = ['ADMIN', 'VISUALIZADOR'];
    return validRoles.includes(role);
}

module.exports = { isValidEmail, isValidBirthDate, isValidCPF, isValidRole};