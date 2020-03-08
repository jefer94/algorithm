import reducer from './tabs'
import { removeTabAction } from '../hooks/useTabs'

test('remove tab', () => {
  const tabs = [{
    id: 0,
    content: 'a',
    active: false
  }, {
    id: 1,
    content: 'b',
    active: true
  }]

  const res = reducer(tabs, removeTabAction(1))
  expect(res.length).toBe(1)
  expect(res[0].id).toBe(0)
  expect(res[0].content).toBe('a')
  expect(res[0].active).toBe(true)
})
