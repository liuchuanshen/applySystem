import http from '@/utils/http'

export const login = (data) => http.get(`/apply/login?username=${data.username}&password=${data.password}`);

