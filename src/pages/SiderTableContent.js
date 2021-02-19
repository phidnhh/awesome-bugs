import React from 'react'

export default function SiderTableContent() {
  return (
    <div className="table-content-author">
      <div className="row justify-content-center align-items-center">
        <table className="table my-table w-50">
          <tbody>
            <tr>
              <td>Author:</td>
              <td>Đặng Nhật Phi</td>
            </tr>
            <tr>
              <td>Facebook:</td>
              <td>
                <a href="https://www.facebook.com/phihh/" target="_blank">
                  https://www.facebook.com/phihh/
              </a>
              </td>
            </tr>
            <tr>
              <td>Github:</td>
              <td>
                <a href="https://github.com/phidnhh/" target="_blank">
                  https://github.com/phidnhh/
              </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row text-center bottom-description">
        <span>" Phải chăng tới giờ ly biệt tình yêu mới biết hết các chiều sâu của nó ! "</span>
        <br />
        <span>" Ever has it been that love knows not its own depth until the hour of separation ! "
      </span>
      </div>
    </div>
  )
}
