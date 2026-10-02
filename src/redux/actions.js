export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";

export const SET_SORT_BY = "SET_SORT_BY";
export const SET_SORT_ORDER = "SET_SORT_ORDER";

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch({
      type: FETCH_BOOKS_REQUEST,
    });

    try {
      const response = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=M0tbfyJz2qUEYYJA3DmHf0fb6ZqfjxcUu1TSKZOGouL0zhmv"
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("NYT API response:", data);

      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        payload: data.results.books || [],
      });
    } catch (error) {
      console.error("Book API error:", error);

      dispatch({
        type: FETCH_BOOKS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const setSortBy = (sortBy) => {
  return {
    type: SET_SORT_BY,
    payload: sortBy,
  };
};

export const setSortOrder = (sortOrder) => {
  return {
    type: SET_SORT_ORDER,
    payload: sortOrder,
  };
};