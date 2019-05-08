import React from 'react'
import { mount } from 'enzyme'
import moxios from 'moxios'

import Root from 'Root'
import App from 'components/App'

beforeEach(() => {
  moxios.install()
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [
      {
        postId: 1,
        id: 1,
        name: 'id labore ex et quam laborum',
        email: 'Eliseo@gardner.biz',
        body:
          'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium',
      },
      {
        postId: 1,
        id: 2,
        name: 'quo vero reiciendis velit similique earum',
        email: 'Jayne_Kuhic@sydney.com',
        body:
          'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et',
      },
    ],
  })
})

afterEach(() => {
  moxios.uninstall()
})

it('can fetch a list of comments and display them', done => {
  // Attempt to render the entire app
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  )

  // Find the 'fetchComments' button and click it
  wrapped.find('.fetch-comments').simulate('click')
  // Introduce a tiny pause
  moxios.wait(() => {
    wrapped.update()
    // Expect to find a list of comments
    expect(wrapped.find('li').length).toEqual(2)
    wrapped.unmount()
    done()
  })
})
