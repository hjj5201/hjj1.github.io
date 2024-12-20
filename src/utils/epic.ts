import { Project } from "types/project"
import { useHttp } from "./http"
import { Kanban } from "types/kanban"
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import { useAddConfig, useDeleteConfig, useEditConfig} from "./use-optimistic-options";
import { useReorderKanbanConfig } from "./use-optimistic-options";
import { Epic } from "types/epic";

export const useEpics = (param?: Partial<Epic>) => {
    const client = useHttp();
  
    return useQuery<Epic[]>(["epics", param], () =>
      client("epics", { data: param })
    );
  };
  
  export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      (params: Partial<Epic>) =>
        client(`epics`, {
          data: params,
          method: "POST",
        }),
      useAddConfig(queryKey)
    );
  };
  
  export const useDeleteEpic = (queryKey: QueryKey) => {
    const client = useHttp();
  
    return useMutation(
      ({ id }: { id: number }) =>
        client(`epics/${id}`, {
          method: "DELETE",
        }),
      useDeleteConfig(queryKey)
    );
  };