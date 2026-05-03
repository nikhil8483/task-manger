 const sanitize = (data) => {
  const cleaned = {}

  for (const key in data) {
    let value = data[key]

    if (typeof value === "string") {
      value = value.trim()
      value = value.replace(/<[^>]*>?/gm, "") // remove HTML tags
    }

    cleaned[key] = value
  }

  return cleaned
}
export{ sanitize }