import { Cemjsx, Static, Fn, Func, Ref } from "cemjs-all"
import calendar from '@svg/ann/calendar.svg'
import magn from '@svg/ann/seach_magnifier.svg'
const RenderTable = function ({ items }) {

  if (!items.length) {
    return (
      <tbody class="history_table-body">
        <tr>
          <td>Пользовател не найдены.</td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody class="history_table-body">
      {
        items.map((item, index) => {
          return (
            <tr>
              <td class="history_table__cell">{(index + 1 + (Static.currentPage - 1) * Static.limitPerPage)}</td>
              <td class="history_table__cell">{item.word}</td>
              <td class="history_table__cell">{item.addedBy}</td>
            </tr>
          )
        })
      }
    </tbody>
  )

}

export default function () {
  return (
    <div class="history_inner">

      <div class="history_info">
        {
          Static.response == null ? <p class="history_info__text"><span class="bold"></span></p> :
            <p class="history_info__text">Всего запрещенных слов: <span class="bold">{Static.response?.totalFound}</span></p>
        }
        {/* <div class="history_info__details">
          {
            Static.response == null ? <p class="history_info__text"><span class="bold"></span></p> :
              <p class="history_info__text">Вчера: <span class="bold">{Static.response?.yesterdayLogsCount}</span></p>
          }
          {
            Static.response == null ? <p class="history_info__text"><span class="bold"></span></p> :
              <p class="history_info__text">Сегодня: <span class="bold">{Static.response?.todayLogsCount}</span></p>
          }
          {
            Static.response == null ? <p class="history_info__text"><span class="bold"></span></p> :
              <p class="history_info__text">Завтра: <span class="bold">{Static.response?.tommorowLogsCount}</span></p>
          }
        </div> */}
      </div>

      <div class="info_send">
        <div class="input_field">
          <input type="text" placeholder="Поиск" class="input_field__input" ref="seach"
            oninput={(e) => {
              if (e.target.value.length) {
                Static.seach = e.target.value
                Func.makeRequest()
              }
            }}
          />
          <div class="input_field__icon">
            <img src={magn} alt="Поиск" />
          </div>
        </div>
      </div>
      <div class='test-container'>
        <table class="history_table">
          <thead >
            <tr class="history_table-head">
              <th class="history_table__cell">№</th>
              <th class="history_table__cell">Запрещенное слово</th>
              <th class="history_table__cell">Добавлено администратором</th>
            </tr>
          </thead>
          <RenderTable items={Static.records} />
        </table>
        <nav class="pagination-container">
          <button
            class="pagination-button"
            aria-label="Previous page"
            title="Previous page"
            onclick={() => {
              if (Static.currentPage > 1) {
                Static.Pages.forEach(element => {
                  element.class = 'pagination-number '
                });
                Static.currentPage -= 1
                Func.pagination()
                Fn.init()
              }
            }}
          >
            &lt;
          </button>
          <div id="pagination-numbers" ref='paginationNumbers'>
            <span class='hidden' ref='first_two' >
              {
                Static.Pages?.slice(0, Static.outertDigitsNumber).map((item, index) => {
                  return (
                    <button class={item.class}
                      onclick={(e) => {
                        Static.Pages.forEach(element => {
                          element.class = 'pagination-number '
                        });
                        Static.currentPage = item.number
                        Func.pagination()

                        item.class += "active"
                        if (Static.currentPage < 3) {
                          Ref.first_two.classList.add('hidden')
                          Static.Begin = 0
                          Static.End = 5
                        }
                        Fn.init()
                      }}
                    >
                      {item.number}</button>
                  )
                })
              }
              <span class='dots' ref='first_two_dots'>...</span>
            </span>
            {
              Static.Pages?.slice(Static.Begin, Static.End).map((item, index) => {
                return (
                  <button class={item.class} ref="pagination_number"
                    onclick={(e) => {
                      Static.Pages.forEach(element => {
                        element.class = 'pagination-number '
                      });
                      Static.currentPage = item.number
                      Func.pagination()
                      item.class += "active"
                      Fn.init()
                    }}
                  >
                    {item.number}
                  </button>
                )
              })
            }
            <span class={["", Static.pageCount >= 5 ? "" : "hidden"]} ref='two_last'>
              <span class='dots'>...</span>
              {
                Static.Pages?.slice(-Static.outertDigitsNumber).map((item, index) => {
                  return (
                    <button class={item.class}
                      onclick={(e) => {
                        Static.Pages.forEach(element => {
                          element.class = 'pagination-number '
                        });
                        Static.currentPage = item.number
                        Func.pagination()
                        item.class += "active"
                        if (Static.currentPage >= Static.lastPage - 3) {
                          Ref.two_last.classList.add('hidden')
                          Ref.first_two.classList.remove('hidden')
                          Static.Begin = Static.Pages.at(-6).number
                          Static.End = Static.lastPage
                        }
                        Fn.init()
                      }}
                    >
                      {item.number}</button>
                  )
                })
              }
            </span>
          </div>
          <button class="pagination-button" id="next-button"
            aria-label="Next page"
            title="Next page"
            onclick={() => {
              if (Static.currentPage < Static.lastPage) {
                Static.Pages.forEach(element => {
                  element.class = 'pagination-number '
                });
                Static.currentPage += 1
                Func.pagination()
                Fn.init()
              }
            }}
          >
            &gt;
          </button>
        </nav>
      </div>
    </div>

  )
}