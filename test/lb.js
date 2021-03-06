import test from 'ava';
import { tfw, inWin, sessionLastLines } from './_utils';

tfw.init({ src: 'lb', RIDE_SPAWN: 'dyalog' });

test(
  'lb-show-hide',
  async (t) => {
    const { app } = t.context;
    const c = app.client;

    await c.waitForExist('#lb');
    const lbarVisible = await c.isVisible('#lb');
    await c.execute(inWin, 0, '<LBR>');
    t.is(await c.isVisible('#lb'), !lbarVisible);
    await c.execute(inWin, 0, '<LBR>');
    t.is(await c.isVisible('#lb'), lbarVisible);
  },
);

test(
  'lb-hover',
  async (t) => {
    const { app } = t.context;
    const c = app.client;

    await c.waitForExist('#lb');
    // turn on if not already
    let lbarVisible = await c.isVisible('#lb');
    if (!lbarVisible) {
      await c.execute(inWin, 0, '<LBR>');
      lbarVisible = await c.isVisible('#lb');
    }
    // hover over ⍤
    await c.moveToObject('b=⍤');
    await c.pause(1000);
    t.true(await c.isVisible('#lb_tip_body'));
    t.is(await c.getText('#lb_tip_desc'), 'JOT DIAERESIS (⍤)');
    // move over tip
    await c.moveToObject('#lb_tip');
    await c.pause(1000);
    t.true(await c.isVisible('#lb_tip'));
    // move over separator
    await c.moveToObject('b=\xA0');
    await c.pause(1000);
    t.false(await c.isVisible('#lb_tip'));
  },
);

test(
  'lb-click',
  async (t) => {
    const { app } = t.context;
    const c = app.client;

    await c.waitForExist('#lb');
    await c.leftClick('b=⍣');
    const r = await c.execute(sessionLastLines, 1);
    t.is(r.value[0].slice(-1), '⍣');
  },
);
