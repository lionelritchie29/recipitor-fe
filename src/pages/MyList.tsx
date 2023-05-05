import { Component, For, createEffect, createResource, createSignal } from 'solid-js';
import { useAuth } from '../providers/AuthProvider';
import { ListService } from '../services/ListService';
import ListItem from '../components/ListItem';

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
    <section>
      <h2 class='text-lg font-bold'>My List</h2>
      <div>
        <ul class='grid grid-cols-4 gap-4' style={{ 'grid-auto-rows': '1fr' }}>
          <For each={lists() ?? []}>
            {(list) => (
              <li>
                <ListItem list={list} />
              </li>
            )}
          </For>
        </ul>
      </div>
    </section>
  );
};

export default MyListPage;
