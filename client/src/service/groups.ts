import { API } from "src/api";
import { AxiosResponse } from "axios";

interface Group {
  id: string;
  group_name: string;
  link: string;
  is_verified: boolean;
}

export const groupActions = {
  getGroups: async (): Promise<{ data: { data: { Groups: Group[] } } }> =>
    await API.get("groups"),
  updateGroup: async (id: string, verified: boolean) =>
    await API.put(`verify/group/${id}`, { is_verify: verified ? 1 : 2 }),
  deleteGroup: async (id: string) => await API.delete(`group/${id}`),
};
