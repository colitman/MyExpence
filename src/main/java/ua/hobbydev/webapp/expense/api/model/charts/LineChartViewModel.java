/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense.api.model.charts;

import java.math.BigDecimal;
import java.util.*;

public class LineChartViewModel {

    private Set<String> labels;
    private Map<String, Line> lines;

    public LineChartViewModel() {
        this.labels = new HashSet<String>();
        this.lines = new Hashtable<String, Line>();
    }

    public Set<String> getLabels() {
        return labels;
    }

    public void setLabels(Set<String> labels) {
        this.labels = labels;
    }

    public Collection<Line> getLines() {
        return lines.values();
    }

    // ~ =============== Utility methods ===========
    public void addLine(String label) {
        Line line = new Line();
        line.setLabel(label);
        lines.put(label, line);
    }

    public void addLineValue(String lineLabel, BigDecimal value) {
        if(!lines.containsKey(lineLabel)) {
            Line newLine = new Line();
            newLine.setLabel(lineLabel);
            lines.put(lineLabel, newLine);
        }

        Line line = lines.get(lineLabel);
        line.getValues().add(value);
    }


    // ~ =============== Line ======================
    private class Line {
        private String label;
        private List<BigDecimal> values;

        public Line() {
            this.label = "";
            this.values = new ArrayList<BigDecimal>();
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public List<BigDecimal> getValues() {
            return values;
        }

        public void setValues(List<BigDecimal> values) {
            this.values = values;
        }
    }
}
