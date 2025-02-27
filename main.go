package main

import (
	"html/template"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

type Link struct {
	Label string
	URL   string
}

type Topic struct {
	Name  string
	Links []Link
}

type Page struct {
	Name  string
	Label string
	Body  template.HTML
}

type HTMLData struct {
	Topic string
	Pages []Page
	Links []Link
}

func getLabel(name string) string {
	return strings.ToUpper(name[:1]) + strings.ReplaceAll(name[1:], "-", " ")
}

func readPages(path string) []Page {
	entries, err := os.ReadDir(path)
	if err != nil {
		log.Fatal(err)
	}

	var out = make([]Page, len(entries))

	for _, entry := range entries {
		data, err := os.ReadFile(filepath.Join(path, entry.Name()))
		if err != nil {
			log.Fatal(err)
		}
		index, name := split(entry.Name(), "-")
		number, err := strconv.Atoi(index)
		if err != nil {
			log.Fatal(err)
		}
		name = strings.TrimSuffix(name, ".html")
		out[number-1] = Page{
			Name:  name,
			Label: getLabel(name),
			Body:  template.HTML(string(data)),
		}
	}

	return out
}

func split(str string, sep string) (string, string) {
	parts := strings.SplitN(str, sep, 2)
	return parts[0], parts[1]
}

func main() {
	if len(os.Args) < 4 {
		log.Fatal(
			"Must provide 3 arguments: path to [docs/], path to [index.html] and path to [src/]",
		)
	}
	docsPath := os.Args[1]
	indexPath := os.Args[2]
	srcPath := os.Args[3]
	tmpl := template.Must(template.ParseFiles(indexPath))

	for i, topic := range []Topic{
		{
			Name: "bbfh",
			Links: []Link{
				{
					Label: "My GitHub",
					URL:   "https://github.com/bbfh-dev",
				},
				{
					Label: "My YouTube",
					URL:   "https://www.youtube.com/@bbfh-yt",
				},
				{
					Label: "My PlanetMinecraft",
					URL:   "https://www.planetminecraft.com/member/bbfh/",
				},
				{
					Label: "My Modrinth",
					URL:   "https://modrinth.com/user/BubbleFish",
				},
			},
		},
		{
			Name: "smithed",
			Links: []Link{
				{
					Label: "Official Website",
					URL:   "https://smithed.net/",
				},
				{
					Label: "Site prototype",
					URL:   "https://bbfh-dev.github.io/external/smithed/index.html",
				},
			},
		},
	} {
		var filename = topic.Name
		if i == 0 {
			filename = "index"
		}

		path := filepath.Join(docsPath, filename+".html")
		pages := readPages(filepath.Join(srcPath, topic.Name))
		err := os.WriteFile(path, []byte{}, os.ModePerm)
		if err != nil {
			log.Fatal(err)
		}
		file, err := os.OpenFile(path, os.O_WRONLY, os.ModePerm)
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()

		tmpl.Execute(file, HTMLData{
			Topic: topic.Name,
			Pages: pages,
			Links: topic.Links,
		})
	}
}
