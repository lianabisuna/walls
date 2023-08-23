export class Factory {
	base = '';
  axios = () => useNuxtApp().$axios;
  // axios = useRuntimeConfig().public.$axios as AxiosStatic;

	constructor(base = '') {
		this.base = base;
	}
  
  list(params?: any) {
		console.log('list');
    return this.axios().get(`/${this.base}`, { params });
  }
  
  show(id: number) {
		console.log('show');
    return this.axios().get(`/${this.base}/${id}`);
  }
  
  create(data: any) {
		console.log('create');
    return this.axios().post(`/${this.base}/`, data);
  }

  delete(id: number) {
		console.log('delete');
    return this.axios().post(`/${this.base}/${id}/delete`);
  }
}