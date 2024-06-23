export const isEmpty = (loginId: string, password?: string) => {
    if (password) {
      return loginId === "" || password === "";
    }
    return loginId === "";
  };