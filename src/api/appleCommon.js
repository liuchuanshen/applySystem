import http from '@/utils/http'

export const applyAreate = (data) => http.get(`/applyCommon/create?id=${data.id}&message=${data.message}&pay=${data.pay}&money=${data.money}&necessary=${data.necessary}&startTime=${data.startTime}&endTime=${data.endTime}&time=${data.time}&status=0`);

export const applyList = (data) => http.post('/applyCommon/list',data);

export const applyAboutMineList = (data) => http.post('/applyCommon/minelist',data);

export const applyUpdate = (data) => http.post('/applyCommon/update',data);