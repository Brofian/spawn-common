<?php

namespace SpawnCommon\Elements;

class TableDefinition {

    public const TYPE_TEXT = 'text';
    public const TYPE_DATETIME = 'datetime';
    public const TYPE_BOOL = 'bool';
    public const TYPE_HIDDEN = 'hidden';

    protected array $columns = [];
    protected array $columnLinks = [];
    protected array $rows = [];

    public function addColumn(string $columnName, string $columnType): void {
        $this->columns[$columnName] = $columnType;
    }

    public function addColumns(array $columns): void {
        foreach($columns as $columnName => $columnType) {
            $this->addColumn($columnName, $columnType);
        }
    }

    /**
     * configuration should be an array with a string, called "route", and a nested array, called "parts", which contains the columns
     * @param string $columnName
     * @param array<string,array> $configuration
     * @return void
     */
    public function addColumnLink(string $columnName, array $configuration) {
        $this->columnLinks[$columnName] = $configuration;
    }

    public function addColumnLinks(array $columnLinks) {
        foreach($columnLinks as $columnName => $columnLink) {
            $this->addColumnLink($columnName, $columnLink);
        }
    }

    public function addRow(array $rowData): void {
        $this->rows[] = $rowData;
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

    public function getColumnLinks(): array {
        return $this->columnLinks;
    }

}