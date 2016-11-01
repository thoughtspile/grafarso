# grafarso &mdash; сокет для графара

Просто возьмите скрипт из [./build/grafarso.js](build/grafarso.js) и вставьте на страницу.

## API

`grafarso.to(url)` — подключиться в роли преподавателя.

`grafarso.from(url)` — подключиться в роли преподавателя.

`grafarso.register(id, callback)` — основная синхронизация. `id` — уникальный идентификатор,  `callback`:
- принимает параметры и по ним обновляет графар.
- не принимает параметры-функции (функцию нельзя передать по сокету).
- не работает с DOM (иначе receiver возьмет состояние интерфеса студента).
Предлагаемый сценарий:
1. Обернуть функцию с обновлением, сохранить результат:
  `const up = grafarso.register('up_1', (val) => grafar.constant(val).into(level));`
2. При обновлении интерфейса вызывать обернутую функцию:
  `up(Number(document.getElementById('control').value));`.

`grafarso.registerPan(id, Panel)` — синхронизировать панель Panel по
уникальному идентификатору id.

Также посмотрите примеры: [преподаватель (с комментариями)](public/index.html), [студент](public/receiver.html).

## Для разработчиков

- `npm run dev` вотчит и запускает на `:3000`
- `npm run build` собирает в `./build/grafarso.js`
