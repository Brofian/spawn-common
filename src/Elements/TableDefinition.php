<?php

namespace SpawnCommon\Elements;

class TableDefinition {

    public const TYPE_TEXT = 'text';
    public const TYPE_DATETIME = 'datetime';
    public const TYPE_BOOL = 'bool';

    protected array $columns = [];
    protected array $rows = [];

    public function addColumn(string $headerSnippetName, string $columnType): void {
        $this->columns[$headerSnippetName] = $columnType;
    }

    public function addColumns(array $columns): void {
        foreach($columns as $columnName => $columnType) {
            $this->addColumn($columnName, $columnType);
        }
    }

    public function addRow(array $rowData): void {
        $this->rows[] = array_values($rowData);
    }

    public function addRows(array $rows): void {
        foreach($rows as $rowData) {
            $this->addRow($rowData);
        }
    }

    public function getHeaderNames(): array {
        return array_keys($this->columns);
    }

    public function getColumnTypes(): array {
        return array_values($this->columns);
    }

    public function getRows(): array {
        return $this->rows;
    }

}