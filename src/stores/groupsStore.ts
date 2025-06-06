import api from "@/api/api";

export class GroupStore {
    groups: any[] = [];
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeObservable(this);
    }
    @action setGroups(groups: any[]) {
        this.groups = groups;
    }
 async loadGroups() {
        this.getGroups()
        this.setGroups(this.groups)
 }
    async getGroups() {
        this.loading = true;
        this.error = null;
        try {
            const response = await api.getAllSupportGroups();
            if (!response.ok) {
                throw new Error('Failed to fetch support groups');
            }
            const data = await response.json();
            this.setGroups(data);
        } catch (error) {
            if (error instanceof Error) {
                this.error = error.message;
            } else {
                this.error = String(error);
            }
        } finally {
            this.loading = false;
        }
    }

    async getGroupById(id: string) {
        this.loading = true;
        this.error = null;
        try {
            const response = await api.getSupportGroupById(id);
            if (!response.ok) {
                throw new Error('Failed to fetch support group');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            if (error instanceof Error) {
                this.error = error.message;
            } else {
                this.error = String(error);
            }
        } finally {
            this.loading = false;
        }
    }

}
