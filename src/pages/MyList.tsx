import { Component, For, createEffect, createResource, createSignal } from 'solid-js';
import { useAuth } from '../providers/AuthProvider';
import { ListService } from '../services/ListService';

const MyListPage: Component = () => {
  const auth = useAuth();
  const [userId, setUserId] = createSignal<number | undefined>(undefined);
  const listService = new ListService();
  const [lists] = createResource(userId, listService.getByUser);

  createEffect(() => {
    if (auth?.user()) {
      setUserId(auth.user()?.id);
    }
  });

  return (
    <div>
      <ul>
        <For each={lists()}>{(list) => <li>{list.Name}</li>}</For>
      </ul>
    </div>
  );
};

export default MyListPage;
