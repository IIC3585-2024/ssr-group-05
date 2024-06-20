import csv


class CsvSaver:
    def __init__(self, filename: str):
        self.output_file_name = filename

    def get_unique_check(self) -> list:
        try:
            with open(self.output_file_name, newline='', encoding='utf-8') as csvfile:
                reader = csv.reader(csvfile)
                data = list(reader)
                unique_check = []
                for row in data[1:]:
                    unique_id = ''.join(row[0])
                    unique_check.append(unique_id)
                return unique_check
        except FileNotFoundError:
            return []

    def save_data(self, data: list) -> None:
        header = [
            'id',
            'title',
            'imdbScore',
            'imdbVotes',
            'posterUrl',
            'genres',
            'platforms',
            'seasons',
        ]
        with open(self.output_file_name, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            if csvfile.tell() == 0:
                writer.writerow(header)

            writer.writerow(data)
